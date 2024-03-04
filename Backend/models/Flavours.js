const { string } = require('joi');
const mongoose = require('mongoose')

const FlavoursSchema = new mongoose.Schema({
    restaurant_name: String,
    location: String,
    specialities: String,
    fresh_seafood: String,
    variety_of_meat_preparation: String,
})

const UserModel = mongoose.model("data", FlavoursSchema);
module.exports = UserModel;
