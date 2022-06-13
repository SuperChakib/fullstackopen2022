const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'queenZ',
    author: 'Lolita',
    url: 'lolita.com',
    likes: 56003,
  },
  {
    title: 'Octopath',
    author: 'Traveler',
    url: 'octy.com',
    likes: 23423,
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingValidId = async () => {
  const blog = new Blog({
    title: 'test',
    url: 'test.com'
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const initialUsers = [
  {
    username: 'root',
    name: 'root',
    password: '4zEr1!'
  },
  {
    username: 'Zelda',
    name: 'Link & Zelda',
    password: '4zEr1!'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, nonExistingValidId, initialUsers, usersInDb
}