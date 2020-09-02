require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const { PORT } = require('./utils/config')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})