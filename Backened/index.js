const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParsor = require('cookie-parser')
const path = require('path');
const userRoutes = require('./Routes/customer')


const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());
app.use(cookieParsor())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use('/api/customers', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'Ubaidullah', { httpOnly: true });
  res.send('Cookie has been set!');
});

app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.send(`Hello, ${username}!`);
  } else {
    res.send('No username cookie found.');
  }
});