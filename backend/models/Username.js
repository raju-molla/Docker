// models/Username.js
const mongoose = require('mongoose');

const usernameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Username', usernameSchema);
