import React, { useState } from 'react';

interface QuestionProps {
  question: { id: number; text: string };
  onAnswer: (id: number, answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  const [answer, setAnswer] = useState('');
  
  const handleSubmit = () => {
    onAnswer(question.id, answer);
  };
  return (
    <div>
      <h2>{question.text}</h2>
      <label>
        {question.text}
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        />
      </label>
        <button type='button' onClick={handleSubmit}>Next</button>
    </div>);
};

export default Question;