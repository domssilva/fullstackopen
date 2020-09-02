require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const notesRouter = require('./controllers/notes')
const { PORT } = require('./utils/config')

// middlewares
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/notes', notesRouter)

// start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})