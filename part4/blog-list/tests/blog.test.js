const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .then(response => {
      return response.body.length === 5
    })
})

afterAll(() => {
  mongoose.connection.close()
})