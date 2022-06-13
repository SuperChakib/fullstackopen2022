const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [ 3, 'username must be at least 3 characters long, got {VALUE}' ],
    validator: {
      validate: function (v) {
        return /^\w*$/.test(v)
      },
      message: props => `${props.value} can only contain alphanumeric characters (underscore included)`
    }
  },
  name: String,
  passwordHash: {
    type: String,
    required: true
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.passwordHash
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User