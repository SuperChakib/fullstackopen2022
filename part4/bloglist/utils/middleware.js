const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const blogLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('Token:', request.token)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).end({
    error: 'unknown endpoint'
  })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({
      error: error.message
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if(error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'expired token' })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  blogLogger,
  unknownEndpoint,
  errorHandler
}