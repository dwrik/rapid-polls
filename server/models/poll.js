const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  options: {
    type: [
      {
        value: { type: String, required: true },
        count: { type: Number, required: true },
      },
    ],
    required: true,
    minlength: 2,
  }
})

pollSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    returnedObject.options.forEach((option) => {
      option.id = option._id
      delete option._id
    })
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Poll', pollSchema)