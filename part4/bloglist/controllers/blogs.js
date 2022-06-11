const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title && !body.url) return response.status(400).end()

  const blog = body.likes
    ? new Blog(body)
    : new Blog({ ...body, likes: 0 })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.put('/', async (request, response) => {
  const modifiedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: 'query' })
  response.json(modifiedBlog)
})

module.exports = blogRouter