import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TakeQuiz = ({ quizId }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`);
        setQuiz(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch quiz:', err);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswer = (selectedIndex) => {
    const currentQ = quiz.questions[currentQIndex];
    const isCorrect = selectedIndex === currentQ.correct;
    setAnswers([...answers, { selectedIndex, isCorrect }]);

    if (currentQIndex + 1 < quiz.questions.length) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      const correctCount = [...answers, { isCorrect }].filter(a => a.isCorrect).length;
      setScore(correctCount);
    }
  };

  if (!quiz) return <div>Loading quiz...</div>;
  if (score !== null) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Quiz Complete!</h2>
        <p>✅ You scored {score} out of {quiz.questions.length}</p>
        <h3>Answers:</h3>
        <ul>
          {quiz.questions.map((q, i) => (
            <li key={i}>
              <strong>{q.text}</strong><br />
              Your answer: {q.options[answers[i].selectedIndex]} <br />
              Correct answer: {q.options[q.correct]} <br />
              {answers[i].isCorrect ? '✔️ Correct' : '❌ Wrong'}
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQIndex];

  return (
    <div style={{ padding: '20px' }}>
      <h2>{quiz.title}</h2>
      <p><strong>Question {currentQIndex + 1}:</strong> {currentQ.text}</p>
      {currentQ.options.map((opt, idx) => (
        <div key={idx}>
          <button onClick={() => handleAnswer(idx)}>{opt}</button>
        </div>
      ))}
    </div>
  );
};

export default TakeQuiz;
