const mongoose = require('mongoose');
const Joi = require('joi');

const FlavoursSchema = new mongoose.Schema({
  restaurant_name:String,
  Location: String,
  Specialities: String,
  Fresh_seafood: String,
  Variety_of_meal_preparation: String,
  UserName: String
   
});
const FlavoursValidation = Joi.object({
  restaurant_name: Joi.string() .required(),
  Location: Joi.string() .required(),
  Specialities: Joi.string() .required(),
  Fresh_seafood: Joi.string() .required(),
  Variety_of_meal_preparation: Joi.string() .required(),
  UserName: Joi.string() .required()
   
});

const FlavoursModel = mongoose.model('data', FlavoursSchema);

module.exports = { FlavoursModel, FlavoursValidation };