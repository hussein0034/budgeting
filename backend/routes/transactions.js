const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

// Get all transactions for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

// Create new transaction
router.post('/', auth, async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;
    
    const transaction = new Transaction({
      user: req.user._id,
      type,
      amount,
      category,
      description,
      date: date || new Date()
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction' });
  }
});

// Update transaction
router.put('/:id', auth, async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;
    
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { type, amount, category, description, date },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction' });
  }
});

// Delete transaction
router.delete('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction' });
  }
});

// Get transaction summary
router.get('/summary', auth, async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: {
            type: '$type',
            category: '$category'
          },
          total: { $sum: '$amount' }
        }
      }
    ]);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching summary' });
  }
});

module.exports = router; 