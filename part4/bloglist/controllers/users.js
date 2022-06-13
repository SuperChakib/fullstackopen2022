const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })

  if (existingUser) {
    return response.status(400).json({ error: 'username already taken' })
  }

  const passwordError = !/(?=.{8,})/.test(password)
    ? 'password must contain at least 8 characters long'
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
