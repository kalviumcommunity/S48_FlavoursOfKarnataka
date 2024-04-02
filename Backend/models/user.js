const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
  UserName: String,
  email: String,
  password: String,
});
const UsersValidation = Joi.object({
  UserName: Joi.string() .required(),
  email: Joi.string() .required(),
  password: Joi.string() .required() 
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = { UserModel, UsersValidation };