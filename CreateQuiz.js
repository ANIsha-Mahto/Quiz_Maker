import React, { useState } from 'react';
import axios from 'axios';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = {
      title,
      questions: [
        {
          text: question,
          options: options.map(opt => opt.replace(/^"|"$/g, '')),
          correct: parseInt(correctIndex),
        },
      ],
    };

    console.log('Submitting this quiz data:', JSON.stringify(quizData, null, 2));


    try {
      const res = await axios.post('http://localhost:5000/api/quizzes/create', quizData);
      alert('✅ Quiz Created!');
      console.log(res.data);
      // reset form
      setTitle('');
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectIndex(0);
    } catch (err) {
      console.error('❌ Error creating quiz:', err);
      alert('Failed to create quiz.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <label>Quiz Title:</label><br />
        <input value={title} onChange={(e) => setTitle(e.target.value)} required /><br /><br />

        <label>Question:</label><br />
        <input value={question} onChange={(e) => setQuestion(e.target.value)} required /><br /><br />

        {options.map((opt, i) => (
          <div key={i}>
            <label>Option {i + 1}:</label><br />
            <input value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} required />
            <br /><br />
          </div>
        ))}

        <label>Correct Option (0–3):</label><br />
        <input
          type="number"
          min="0"
          max="3"
          value={correctIndex}
          onChange={(e) => setCorrectIndex(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default CreateQuiz;
