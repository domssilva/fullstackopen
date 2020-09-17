const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post('/', async (request, response) => {
  const { blog } = request.body
  const blogPost = new Blog(blog)
  const result = await blogPost.save()
  response.json(result)
})

module.exports = router
