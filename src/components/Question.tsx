import React, { useState } from 'react';

interface QuestionProps {
  question: { id: number; text: string };
  onAnswer: (id: number, answer: string | boolean) => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
  previousAnswer?: string;
}

const Question: React.FC<QuestionProps> = ({
  question,
  onAnswer,
  onBack,
  currentStep,
  totalSteps,
  previousAnswer = '',
}) => {
  const [answer, setAnswer] = useState(previousAnswer);
  const [error, setError] = useState('');

  const validateAnswer = (value: string): boolean => {
    if (!value.trim()) {
      setError('Please enter an answer.');
      return false;
    }

    const numberValue = parseFloat(value);
    if (isNaN(numberValue)) {
      setError('Please enter a valid number.');
      return false;
    }

    if (numberValue < 0) {
      setError('Please enter a positive number.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (validateAnswer(answer)) {
      onAnswer(question.id, answer);
    }
  };

  return (
    <div className='question-container'>
      <div className='progress-indicator'>
        Step {currentStep} of {totalSteps}
      </div>
      <h2>{question.text}</h2>
      <div className='input-group'>
        <label htmlFor={`question-${question.id}`}>
          <span className='currency-symbol'>$</span>
          <input
          id={`question-${question.id}`}
          type="number"
          min="0"
          step="0.01"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            if (error) validateAnswer(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter')
              handleSubmit();
            }}
          />
          </label>
          {error && <div className="error-message">{error}</div>}
      </div>

      <div className='button-group'>
        {onBack && currentStep > 1 && (
          <button type="button" onClick={onBack} className='back-button'>
            Back
          </button>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className='next-button'
          disabled={!answer.trim()}
          >
            {currentStep === totalSteps ? 'Calculate Budget' : 'Next'}
          </button>
      </div>
    </div>
  );
};

export default Question;