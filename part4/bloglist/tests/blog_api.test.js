const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for(let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

afterAll(() => {
  mongoose.connection.close()
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('their unique identifier property is id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const urls = response.body.map(r => r.url)
    expect(urls).toContain('octy.com')
  })
})

describe('adding a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog ={
      title: 'salameche',
      author: 'chakib',
      url: 'salameche.chakib.com',
      likes: 334
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(blog => {
      return { title: blog.title, url: blog.url }
    })
    expect(contents).toContainEqual({ title: 'salameche', url: 'salameche.chakib.com' })
  })

  test('succeeds with likes defaulting to 0 if it is missing', async () => {
    const newBlog ={
      title: 'salameche',
      author: 'chakib',
      url: 'salameche.chakib.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('fails with statuscode 400 if data is invalid', async () => {
    const newBlog ={
      author: 'chakib',
      likes: 334
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with statuscode 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    if (blogToDelete.title) {
      const titles = blogsAtEnd.map(r => r.title)
      expect(titles).not.toContainEqual(blogToDelete.title)
    } else if (blogToDelete.url) {
      const urls = blogsAtEnd.map(r => r.url)
      expect(urls).not.toContainEqual(blogToDelete.url)
    }
  })

  test('succeeds with statuscode 204 even if blog already deleted', async () => {
    const validNonExistingId = await helper.nonExistingValidId()

    await api
      .delete(`/api/blogs/${validNonExistingId}`)
      .expect(204)
  })

  test('fails with statuscode 400 if malformatted id', async () => {
    const invalidId = 1
    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('updating a blog', () => {
  test('succeeds with statuscode 200', async () => {
    const updateInfo = {
      likes: 1234
    }

    const blogsAtStart = await helper.blogsInDb()
    const idToUpdate = blogsAtStart[0].id

    await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(updateInfo)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('only updates the likes',  async () => {
    const updateInfo = {
      title: 'Marvel',
      author: 'Jupiter',
      url: 'm.jupiter.com',
      likes: 1234
    }

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(updateInfo)

    expect(response.body).toEqual({ ...blogToUpdate, likes: updateInfo.likes })
  })

  test('doesn\'t change the likes if property not precised', async () => {
    const updateInfo = {
      title: 'Marvel',
      author: 'Jupiter',
      url: 'm.jupiter.com'
    }

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(updateInfo)

    expect(response.body.likes).toBe(blogToUpdate.likes)
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const response = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual(blogToView)
  })

  test('fails with statuscode 404 if id of deleted blog', async () => {
    const nonExistingValidId = await helper.nonExistingValidId()

    await api
      .get(`/api/blogs/${nonExistingValidId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if malformatted id', async () => {
    const invalidId = 1

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})