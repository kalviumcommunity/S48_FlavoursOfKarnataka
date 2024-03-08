const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Flavours');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Bindhushree:Bindu%402005@cluster0.akxtu94.mongodb.net/?retryWrites=true&w=majority/Flavours_Of_Karnataka", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', routes);

app.get('/', (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate({_id:id}, {
    restaurant_name: req.body.restaurant_name,
    location: req.body.location,
    specialities: req.body.specialities,
    fresh_seafood: req.body.fresh_seafood,
    variety_of_meat_preparation: req.body.variety_of_meat_preparation
  }, { new: true })
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.status(500).json(err));
});


app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id)
    .then(() => res.json({ success: true, message: "User deleted successfully" }))
    .catch(err => res.status(500).json(err));
});

app.post("/createUser", async (req, res) => {
  try {
    const { restaurant_name, location, specialities, fresh_seafood, variety_of_meat_preparation } = req.body;

    // Create a new user
    const newUser = new UserModel({
      restaurant_name,
      location,
      specialities,
      fresh_seafood,
      variety_of_meat_preparation,
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
