const mongoose = require('mongoose')

const extensionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: null
  },
  prompt: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  files: [
    {
      filename: {
        type: String
      },
      content: {
        type: String
      }
    }
  ],
  status: {
    type: String,
    enum: ['generated', 'failed'],
    default: 'generated'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Extension', extensionSchema)

