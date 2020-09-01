const mongoose = require('mongoose')
const process = require('process')

let password
let newPersonName
let newPersonNumber

if (process.length >= 1 && ((process.length !== 5) && (process.length !== 1))) {
  console.log('Please provide the password, person and number as an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
}

// parse db password from arguments
password = process.argv[2]

// db connection
let dbConnectionLink = `mongodb+srv://fullstack:${password}@cluster0.lg6qa.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(dbConnectionLink, { useNewUrlParser: true, useUnifiedTopology: true })

// person's schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// person's model
const Person = mongoose.model('Person', personSchema)

// if 5 arguments: add it as new contact
if (process.argv.length === 5) {
  // parsing arguments
  newPersonName = process.argv[3]
  newPersonNumber = process.argv[4]

  // add new contact with the arguments data
  const person = new Person({
    name: newPersonName,
    number: newPersonNumber,
  })

  // save
  person.save().then(result => {
    console.log('new contact added.')
    mongoose.connection.close()
  })
} else {
  // list all contacts from collection
  Person
    .find({})
    .then(result => {
      result.forEach(contact => {
        console.log(contact)
      })

      mongoose.connection.close()
    })
}