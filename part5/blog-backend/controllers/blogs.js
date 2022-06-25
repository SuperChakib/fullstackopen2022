const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const notes = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(notes)
})

router.get('/:id', async (request, response) => {
  const note = await Blog.findById(request.params.id)
  response.json(note)
})

router.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user
  const blog = request.body.likes
    ? new Blog({ ...request.body, user: user._id })
    : new Blog({ ...request.body, user: user._id, likes: 0 })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  const decodedUser = request.user

  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(204).end()
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== decodedUser.id) {
    return response.status(401).json({
      error: 'only the creator can delete a blog'
    })
  }

  await Blog.findByIdAndRemove(request.params.id)

  //delete blog reference inside user object in database
  const blogIndex = decodedUser.blogs.indexOf(blogToDelete._id)
  const updatedUserBlogs = [ ...decodedUser.blogs.slice(0, blogIndex), ...decodedUser.blogs.slice(blogIndex + 1)]
  await User.findByIdAndUpdate(
    decodedUser.id,
    { blogs: updatedUserBlogs },
    { new: true, runValidators: true, context: 'query' }
  )

  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true, runValidators: true, context: 'query' }
    )

  response.json(updatedBlog)
})

module.exports = router