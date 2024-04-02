const mongoose = require('mongoose');
const Joi = require('joi');


const LoginValidation = Joi.object({
  UserName: Joi.string() .required(),
  email: Joi.string() .required(),
  password: Joi.string() .required() 
});


module.exports =  LoginValidation ;