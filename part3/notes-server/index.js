require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()

// db config
const Note = require('./models/note')
const { response } = require('express')

// allows us to access body data
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT

/*
let notes =  [
    {
        "id": 1,
        "content": "HTML is easy",
        "date": "2019-05-30T17:30:31.098Z",
        "important": false
    },
    {
        "id": 2,
        "content": "Browser can execute only Javascript",
        "date": "2019-05-30T18:39:34.091Z",
        "important": true
    },
    {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "date": "2019-05-30T19:20:14.298Z",
        "important": false
    },
    {
        "content": "this is cool!",
        "date": "2020-08-01T15:14:36.457Z",
        "important": false,
        "id": 4
    },
    {
        "content": "js rocks",
        "date": "2020-08-01T15:33:59.115Z",
        "important": false,
        "id": 5
    },
    {
        "content": "react is fun!",
        "date": "2020-08-01T15:41:15.954Z",
        "important": true,
        "id": 6
    },
    {
        "content": "hello world",
        "date": "2020-08-01T16:32:58.110Z",
        "important": false,
        "id": 7
    },
    {
        "content": "testing",
        "date": "2020-08-01T18:02:45.056Z",
        "important": true,
        "id": 8
    },
    {
        "content": "cool",
        "date": "2020-08-01T18:04:19.418Z",
        "important": false,
        "id": 9
    }
]
*/

///////////////////////////////////////////
// FUNCTIONS

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0

    return maxId + 1
}

///////////////////////////////////////////
// ROUTES

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

// get all notes
app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

// get single note
app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id).then(note => {
        res.json(note)
    })
})

// remove note
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id)

    res.status(204).end()
})

// create note
app.post('/api/notes', (req, res) => {
    const body = req.body

    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note
        .save()
        .then(savedNote => {
            response.json(savedNote)
        })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})