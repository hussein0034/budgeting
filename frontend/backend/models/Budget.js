const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
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
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  period: {
    type: String,
    enum: ['monthly', 'weekly', 'yearly'],
    default: 'monthly'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Index for faster queries
budgetSchema.index({ user: 1, category: 1 });

module.exports = mongoose.model('Budget', budgetSchema); 