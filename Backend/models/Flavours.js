const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    restaurant_name: String,
    location: String,
    specialities: String,
    fresh_seafood: String,
    variety_of_meat_preparation: String,
    ambience: String,
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel