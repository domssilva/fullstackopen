require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const process = require('process')
const cors = require('cors')
const Persons = require('./models/person')

const PORT = process.env.PORT
const app = express()

// server config
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({
      error: 'malformatted id',
    })
  }

  next(error)
}

app.use(errorHandler)

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  //res.send(phonebookData);
  Persons
    .find({})
    .then(results => {
      res.send(results)
    })

})

app.get('/api/persons/:id', (req, res, next) => {

  const id = req.params.id

  // fetch single phonebook entry based on id
  Persons
    .findById(id)
    .then(personFound => {
      res.send(personFound)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Persons
    .findByIdAndRemove(id)
    .then(result => {
      console.log(`${result} removed`)
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {

  const body = req.body

  // error handling: request is missing name or number
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'contact data missing.',
    })
  }

  const contact = new Persons({
    name: body.name,
    number: body.number,
  })

  contact
    .save()
    .then(savedContact => {
      res.json(savedContact)
    })
    .catch(err => {
      res.status(400).json({
        error: err.message,
      })
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }

  Persons
    .findByIdAndUpdate(body.id, person, { new: true })
    .then(newPerson => res.json(newPerson.toJSON()))
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  Persons
    .find({})
    .then(result => {
      const personsRegistered = result.length
      res.send(`Phonebook has info for ${personsRegistered} people <br><br> ${new Date()}`)
    })
    .catch(error => next(error))

})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
