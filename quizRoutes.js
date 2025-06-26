const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz'); // Adjust path if needed

// ✅ Create a new quiz
router.post('/create', async (req, res) => {
  console.log("📩 Incoming data:", req.body);

  try {
    const { title, questions } = req.body;

    if (!title || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Invalid quiz data' });
    }

    const quiz = new Quiz({ title, questions });
    await quiz.save();

    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    console.error('❌ Error saving quiz:', error.message);
    res.status(500).json({ error: 'Server error while saving quiz' });
  }
});

// ✅ Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error('❌ Error fetching quizzes:', error.message);
    res.status(500).json({ error: 'Server error while fetching quizzes' });
  }
});

// ✅ Get a quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    res.json(quiz);
  } catch (error) {
    console.error('❌ Error fetching quiz by ID:', error.message);
    res.status(500).json({ error: 'Server error while fetching quiz' });
  }
});

module.exports = router;
