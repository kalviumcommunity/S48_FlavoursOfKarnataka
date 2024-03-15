const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { UserModel, schema } = require('./models/Flavours');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb+srv://Bindhushree:Bindu%402005@cluster0.akxtu94.mongodb.net/Flavours_Of_Karnataka");

app.use('/', routes);

app.get('/', (req, res) => {
  UserModel.find({})
  .then(users => res.json(users))
  .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res)=>{
  const id = req.params.id;
  UserModel.findById({_id:id})
  .then(users => res.json(users))
  .catch(err => res.json(err))
})

app.post("/CreateUser", async (req, res) => {
  try {
    const { resturant_name, location, specialities, fresh_seafood, variety_of_meal_preparation, ambience } = req.body;

    // Validate request body using Joi
    const { error } = schema.validate({ resturant_name, location });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Check if the resturant_name already exists
    const userCheck = await UserModel.findOne({ resturant_name });
    if (userCheck) {
      return res.status(400).json({
        success: false,
        message: "resturant_name already exists",
      });
    }

    // Create a new user
    const newUser = new UserModel({
      resturant_name,
      location,
      specialities,
      fresh_seafood,
      variety_of_meal_preparation,
      ambience

    });
    await newUser.save();

    res.json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the user",
    });
  }
});

app.use((req, res) => res.status(404).send('Not found'));

app.listen(PORT, () => {
  console.log(`🚀Server is running on port ${PORT}`);
});