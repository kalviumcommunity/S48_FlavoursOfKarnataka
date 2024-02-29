const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Flavours');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Bindhushree:Bindu%402005@cluster0.akxtu94.mongodb.net/Flavours_Of_Karnataka");

// Routes
app.use('/', routes);

// Additional route
app.get('/getuser', (req, res) => {
  UserModel.find()
    .then(data => {
      console.log("Users:", data);
      if (data.length === 0) {
        return res.status(404).json({ error: "No users found" });
      }
      res.json(data);
    })
    .catch(err => {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Default 404 route
app.use((req, res) => res.status(404).send('Not found'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀Server is running on port ${PORT}`);
});