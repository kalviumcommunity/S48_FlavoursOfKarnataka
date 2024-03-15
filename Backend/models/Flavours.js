const mongoose = require("mongoose");
const Joi = require("joi")

const UserSchema = new mongoose.Schema({
    restaurant_name: String,
    location: String,
    specialities: String,
    fresh_seafood: String,
    variety_of_meat_preparation: String,
    ambience: String,
})

const UserModel = mongoose.model("users", UserSchema)
const schema = Joi.object({
    restaurant_name: Joi.string().required(),
    location: Joi.string().required(),
    specialities: Joi.string().required(),
    variety_of_meat_preparation: Joi.string().required(),
    ambience: Joi.string().required()
});
module.exports = {
    UserModel,
    schema
};