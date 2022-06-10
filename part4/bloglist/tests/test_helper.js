const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'queenZ',
    author: 'Lolita',
    url: 'lolita.com',
    likes: 56003,
    id: '629cac47b278993d925b9f5a'
  },
  {
    title: 'Octopath',
    author: 'Traveler',
    url: 'octy.com',
    likes: 23423,
    id: '629cd6345e5a348601cb6743'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}