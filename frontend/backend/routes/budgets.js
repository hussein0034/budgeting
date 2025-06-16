const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');

// Get all budgets for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching budgets' });
  }
});

// Create new budget
router.post('/', auth, async (req, res) => {
  try {
    const { category, amount, period, startDate, endDate } = req.body;
    
    const budget = new Budget({
      user: req.user._id,
      category,
      amount,
      period,
      startDate: startDate || new Date(),
      endDate
    });

    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error creating budget' });
  }
});

// Update budget
router.put('/:id', auth, async (req, res) => {
  try {
    const { category, amount, period, startDate, endDate, isActive } = req.body;
    
    const budget = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { category, amount, period, startDate, endDate, isActive },
      { new: true }
    );

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget' });
  }
});

// Delete budget
router.delete('/:id', auth, async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json({ message: 'Budget deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting budget' });
  }
});

// Get budget progress
router.get('/progress', auth, async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id, isActive: true });
    const progress = await Promise.all(budgets.map(async (budget) => {
      const startDate = budget.startDate;
      const endDate = budget.endDate || new Date();
      
      const spent = await Transaction.aggregate([
        {
          $match: {
            user: req.user._id,
            category: budget.category,
            type: 'expense',
            date: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' }
          }
        }
      ]);

      return {
        budget,
        spent: spent[0]?.total || 0,
        remaining: budget.amount - (spent[0]?.total || 0)
      };
    }));

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching budget progress' });
  }
});

module.exports = router; 