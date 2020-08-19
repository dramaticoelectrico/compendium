const Joi = require('@hapi/joi')

const registerUser = (formData) => {
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(220).required(),
  }
  const { error } = Joi.validate(formData, schema)
  return error
}
const loginUser = (formData) => {
  const schema = {
    email: Joi.string().email(),
    password: Joi.string().min(8).max(220).required(),
  }
  const { error } = Joi.validate(formData, schema)
  return error
}
module.exports = { registerUser, loginUser }
