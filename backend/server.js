const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const FILE_PATH = '/app/backend/usernames.txt'
// const FILE_PATH = path.join(__dirname, 'usernames.txt');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create the file if it doesn't exist
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, '');
}

// API to add a username
app.post('/addUsername', (req, res) => {
  const { username } = req.body;

  if (!username || username.trim() === '') {
    return res.status(400).json({ message: 'Username is required' });
  }

  fs.appendFile(FILE_PATH, username + '\n', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to save username' });
    }
    res.json({ message: 'Username added successfully' });
  });
});

// API to get the list of usernames
app.get('/usernames', (req, res) => {
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read file' });
    }
    const usernames = data.trim().split('\n').filter(Boolean);
    res.json({ usernames });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
