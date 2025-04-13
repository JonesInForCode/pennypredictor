import React, { useState } from 'react';

interface Question {
  id: number;
  text: string;
}
interface QuestionProps {
  question: Question;
  onAnswer: (id: number, answer: string | boolean) => void;
  type?: 'text' | 'radio';
  options?: string[];
}

const Question: React.FC<QuestionProps> = ({
  question,
  onAnswer,
  type = 'text',
  options = [],
}) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    onAnswer(question.id, type === 'radio' ? options.indexOf(answer) === 0 : answer);
  };
  return (
    <div>
      <h2>{question.text}</h2>
      {type === 'text' ? (
        <input
          placeholder="Enter your answer"
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      ) : (
        <div>
          {options.map((option, index) => (
            <div key={index}>
              <input
                placeholder='Enter your answer'
                type="radio"
                name="payFrequency"
                value={option}
                checked={answer === option}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      )}
      <button type="button" onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
};

export default Question;