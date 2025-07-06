const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Username = require('./models/Username'); // import the model

const app = express();
const PORT = 5000;

// Replace with your actual MongoDB URI
// const MONGO_URI = 'http://localhost:27017/test'; // Example URI, change as needed

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const MONGO_URI = 'mongodb://localhost:27017/test';
const MONGO_URI = 'mongodb://mongodb:27017/test';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


// API to add a username
app.post('/addUsername', async (req, res) => {
  const { username } = req.body;

  if (!username || username.trim() === '') {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const newUsername = new Username({ name: username });
    await newUsername.save();
    res.json({ message: 'Username added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save username' });
  }
});

// API to get the list of usernames
app.get('/usernames', async (req, res) => {
  try {
    const usernames = await Username.find().select('name -_id');
    res.json({ usernames: usernames.map(u => u.name) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch usernames' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
