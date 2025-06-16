const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: [
      'salary',
      'freelance',
      'investments',
      'food',
      'transportation',
      'housing',
      'utilities',
      'entertainment',
      'shopping',
      'healthcare',
      'education',
      'other'
    ]
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
transactionSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Transaction', transactionSchema); 