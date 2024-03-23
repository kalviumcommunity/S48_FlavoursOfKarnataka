const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String 
});
const UserstValidation = Joi.object({
  firstName: Joi.string() .required(),
  lastName: Joi.string() .required(),
  email: Joi.string() .required(),
  password: Joi.string() .required() 
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = { UserModel, UserstValidation };