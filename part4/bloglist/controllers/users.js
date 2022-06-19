const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  //main validation done here to save unnecessary actions and time
  if (!username || !password) {
    return response.status(400).json({ error: 'username and password must be provided' })
  }

  if (username.length < 3) {
    return response.status(400).json({ error: `username must be at least 3 characters long, got ${username.length}` })
  }

  let passwordError = []
  if (!/(?=.{3,})/.test(password)) {
    passwordError.push(`password must be at least 3 characters long, got ${password.length}`)
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    passwordError.push('password must contain at least one uppercase character')
  }
  if (!/(?=.*[a-z])/.test(password)) {
    passwordError.push('password must contain at least one lowercase character')
  }
  if (!/(?=.*[0-9])/.test(password)) {
    passwordError.push('password must contain at least one digit')
  }
  if (!/(?=.*[^A-Za-z0-9])/.test(password)) {
    passwordError.push('password must contain at least one special character')
  }
  if (passwordError.length) {
    return response.status(400).json({ error: passwordError.join(', ') })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: 'username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash
  })
  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

module.exports = userRouter
