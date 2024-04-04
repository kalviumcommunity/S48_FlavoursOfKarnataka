const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { FlavoursModel, FlavoursValidation } = require('./models/Flavours');
const {UserModel, UsersValidation } = require('./models/user');
const routes = require('./routes');
require('dotenv').config();
const Joi = require('joi');
const LoginValidation = require('./models/login')
const app = express();
const PORT = 3000;
const Jwt= require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING);

// Routes
app.use('/', routes);

app.get('/getFlavours', (req, res) => {
  FlavoursModel.find({})
    .then(Flavours => res.json(Flavours))
    .catch(err => res.json(err));
});

app.get('/getUsers', (req, res) => {
  UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get('/getFlavours/:id', (req, res) => {
  const id = req.params.id;
  FlavoursModel.findById({ _id: id })
    .then(player => res.json(player))
    .catch(err => res.json(err));
});

app.get('/getUsers/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.put('/UpdateUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate({_id:id}, req.body, { new: true })
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.status(500).json(err));
});

app.put('/updateFlavours/:id', (req, res) => {
  const id = req.params.id;
  FlavoursModel.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedFlavour => res.json(updatedFlavour))
    .catch(err => res.status(500).json(err));
});

app.delete('/deleteFlavours/:id', (req, res) => {
  const id = req.params.id;
  FlavoursModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.post('/Login', async (req, res) => {
  try {
    const { UserName,email, password } = req.body;
    const validate = await LoginValidation.validateAsync(req.body)
    const user = await UserModel.findOne({ UserName:validate.UserName,email:validate.email,password:validate.password });
    const accessToken = Jwt.sign({password},JWT_SECRET_KEY)
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid UserName or password" });
    }
    
    res.json({ success: true, message: "Login successfull",accessToken:accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "An error occurred during login" });
  }
});

app.post("/createFlavours", async (req, res) => {
  try {
    const { restaurant_name, Location, Specialities, Fresh_seafood,Variety_of_meal_preparation} = req.body;
    const { error } = FlavoursValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const newPlayer = new FlavoursModel({ restaurant_name, Location, Specialities, Fresh_seafood, Variety_of_meal_preparation });
    await newPlayer.save();

    res.json({
      success: true,
      message: "Player created successfully",
      player: newPlayer,
    });
  } catch (error) {
    console.error("Error creating player:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the player",
    });
  }
});

app.post("/Createuser", async (req, res) => {
  try {
    const { UserName, email, password } = req.body;
    const { error } = UsersValidation.validate({ UserName, email, password });
    if (error){
      return res.status(400).send(error.details[0].message);
    }
    const newUser = new UserModel({ UserName, email, password });
    await newUser.save();

    res.json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the user",
    });
  }
});

// Default 404 route
app.use((req, res) => res.status(404).send('Not found'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀Server is running on port ${PORT}`);
});
