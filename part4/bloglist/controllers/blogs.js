const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog
    ? response.json(blog)
    : response.status(404).end()
})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (blog && decodedToken.id === blog.user.toString()) {
    await blog.remove()
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'missing or invalid token (maybe different user)' })
  }

})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title && !body.url) return response.status(400).end()

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = body.likes
    ? new Blog({ ...body, user: user._id })
    : new Blog({ ...body, user: user._id, likes: 0 })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  await savedBlog.populate('user', { username: 1, name: 1 })
  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const likes = request.body.likes

  const modifiedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    likes ? { likes } : {},
    { new: true, runValidators: true, context: 'query' })

  response.json(modifiedBlog)
})

module.exports = blogRouter