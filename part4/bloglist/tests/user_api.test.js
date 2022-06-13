const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const mongoose = require('mongoose')


const api = supertest(app)

afterAll(() => {
  mongoose.connection.close()
})

describe('saving a user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    for (let user of helper.initialUsers) {
      await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    }
  })

  test('succeeds with proper statuscode if valid data', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Skinny',
      name: 'Evian Skinny',
      password: '4zEr1!'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    expect(response.body.username).toEqual(newUser.username)
    expect(response.body.name).toEqual(newUser.name)
  })

  test('fails with proper statuscode and message if username missing', async () => {
    const newUser = {
      name: 'Evian Skinny',
      password: '4zEr1!'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe('username and password must be provided')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('fails with proper statuscode and message if password missing', async () => {
    const newUser = {
      username: 'Skinny',
      name: 'Evian Skinny'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe('username and password must be provided')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('fails with proper statuscode and message if username too short', async () => {
    const newUser = {
      username: 'Sk',
      name: 'Evian Skinny',
      password: '4zEr1!'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('username must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('fails with proper statuscode and message if password too short', async () => {
    const newUser = {
      username: 'Skinny',
      name: 'Evian Skinny',
      password: '4z'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('fails with proper statuscode and message if username already taken', async () => {
    const newUser = {
      username: 'root',
      name: 'Evian Skinny',
      password: '4zEr1!'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
})