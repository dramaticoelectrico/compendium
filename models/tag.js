const mongoose = require('mongoose')

const Tag = new mongoose.Schema({
  tag: String,
})
module.exports = mongoose.model('Tag', Tag)
