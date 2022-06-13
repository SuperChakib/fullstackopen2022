const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  //main validation done here to save superfluous actions and time
  if (!username || !password) {
    return response.status(400).json({ error: 'username and password must be provided' })
  }
  if (username.length < 3) {
    return response.status(400).json({ error: `username must be at least 3 characters long, got ${username.length}` })
  }
  const passwordError = !/(?=.{3,})/.test(password)
    ? `password must be at least 3 characters long, got ${password.length}`
    : !/(?=.*[A-Z])/.test(password)
      ? 'password must contain at least one uppercase character'
      : !/(?=.*[a-z])/.test(password)
        ? 'password must contain at least one lowercase character'
        : !/(?=.*[0-9])/.test(password)
          ? 'password must contain at least one digit'
          : !/(?=.*[^A-Za-z0-9])/.test(password)
            ? 'password must contain at least one special character'
            : ''
  if (passwordError) {
    return response.status(400).json({ error: passwordError })
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
