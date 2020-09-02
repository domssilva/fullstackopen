require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./models/note')
const { response } = require('express')
const { PORT } = require('./utils/config')
const logger = require('./utils/logger')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message,
    })
  }

  next(error)
}

// middlewares
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

///////////////////////////////////////////
// ROUTES

// get all notes
app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

// get single note
app.get('/api/notes/:id', (req, res, next) => {
  Note
    .findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

// remove note
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// create note
app.post('/api/notes', (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save()
    .then(savedNote => savedNote.toJSON())
    .then(savedAndFormattedNote => res.json(savedAndFormattedNote))
    .catch(error => next(error))
})

app.use(unknownEndpoint)

// start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})