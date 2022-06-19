const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

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

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(204).end()
  }

  const user = request.user
  if (user && user.toJSON().id === blog.user.toString()) {
    await blog.remove()
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'token is invalid' })
  }
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  if (!body.title && !body.url) return response.status(400).end()

  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token is invalid' })
  }

  const blog = body.likes
    ? new Blog({ ...body, user: user._id })
    : new Blog({ ...body, user: user._id, likes: 0 })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  await savedBlog.populate('user', { username: 1, name: 1 })
  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
  const blogToModify = await Blog.findById(request.params.id)
  const user = request.user

  if (user && user.toJSON().id === blogToModify.user.toString()) {
    const likes = request.body.likes

    const modifiedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      likes ? { likes } : {},
      { new: true, runValidators: true, context: 'query' })

    response.json(modifiedBlog)
  }
  else {
    response.status(401).json({ error: 'token is invalid' })
  }

})

module.exports = blogRouter