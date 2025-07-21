const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Credential = require('./models/Credential'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Routes
app.get('/', async (req, res) => {
  const credentials = await Credential.find();
  res.json(credentials);
});

app.post('/', async (req, res) => {
  const { website, username, password } = req.body;
  const saved = await Credential.create({ website, username, password });
  res.json(saved);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
