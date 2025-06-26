const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // to read .env file

const quizRoutes = require('./routes/quizRoutes'); // your route file


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Log every request to the terminal
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// ✅ Routes
app.use('/api/quizzes', quizRoutes);

app.get('/test', (req, res) => {
  res.send('✅ Backend is working!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
