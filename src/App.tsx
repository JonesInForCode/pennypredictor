import React, { useState } from 'react';
import Question from './components/Question.tsx';
import Summary from './components/Summary.tsx';

interface Question {
  id: number;
  text: string;
}

const questions: Question[] = [
  { id: 1, text: 'What is your expected income?'},
  { id: 2, text: 'What are your expected bills?' },
  { id: 3, text: 'What are your expected expenditures?' },
  ];
  
  function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    
    const handleAnswer = (id: number, answer: string) => {
      setAnswers({ ...answers, [id]: answer });
      setCurrentQuestion(currentQuestion + 1);
    };
    
    return (
      <div>
        {currentQuestion < questions.length ? (
          <Question
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            />
            ) : (
            <Summary answers={answers} />
            )
        }
      </div>);
  }

export default App;
