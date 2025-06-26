const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  questions: [
    {
      text: {
        type: String,
        required: true
      },
      options: {
        type: [String],
        required: true,
        validate: [arrayLimit, 'Exactly 4 options required']
      },
      correct: {
        type: Number,
        required: true,
        min: 0,
        max: 3
      }
    }
  ]
});

// Ensure exactly 4 options
function arrayLimit(val) {
  return val.length === 4;
}

module.exports = mongoose.model('Quiz', quizSchema);
