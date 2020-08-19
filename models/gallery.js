const mongoose = require('mongoose')

const Gallery = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
  },
  description: {
    type: String,
    required: true,
    min: 6,
  },
  tag: {
    type: String,
    default: 'Global',
  },
  publish: {
    type: Boolean,
    default: false,
  },
  image: {
    secure_url: String,
    width: Number,
    height: Number,
    breakpoints: [
      {
        secure_url: String,
        width: Number,
        height: Number,
      },
    ],
  },
})
module.exports = mongoose.model('Gallery', Gallery)
