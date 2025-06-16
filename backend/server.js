const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({ 
  origin: ['https://budgeting-hu3e.onrender.com', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection with fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://budget-app:budget-app-password@cluster0.mongodb.net/budget-app?retryWrites=true&w=majority';
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/budgets', require('./routes/budgets'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Use environment variable for PORT, Render auto-detects the correct port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
