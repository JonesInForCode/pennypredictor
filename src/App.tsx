import React, { useState } from 'react';
import Question from './components/Question';
import Summary from './components/Summary';
import './App.css';

// Define better types for our data
interface BudgetQuestion {
  id: number;
  text: string;
  explanation?: string;
}

interface BudgetData {
  biweeklyPaycheck: number;
  monthlyBills: number;
  additionalExpenses: number;
}

const questions: BudgetQuestion[] = [
  { 
    id: 1, 
    text: 'What is your most recent paycheck amount?',
    explanation: 'Enter the net (after-tax) amount from your most recent paycheck'
  },
  { 
    id: 2, 
    text: 'What are your total monthly bills?',
    explanation: 'Include rent/mortgage, utilities, subscriptions, loan payments, etc.'
  },
  { 
    id: 3, 
    text: 'What are your expected additional expenses?',
    explanation: 'Include groceries, gas, entertainment, and other variable expenses'
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showSummary, setShowSummary] = useState(false);
  
  const handleAnswer = (id: number, answer: string) => {
    setAnswers({ ...answers, [id]: answer });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
    }
  };
  
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleReset = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowSummary(false);
  };
  
  // Process the answers into a more usable format
  const processedData: BudgetData = {
    biweeklyPaycheck: parseFloat(answers[1] || '0'),
    monthlyBills: parseFloat(answers[2] || '0'),
    additionalExpenses: parseFloat(answers[3] || '0'),
  };
  
  return (
    <div className="budget-app">
      <header>
        <h1>Monthly Budget Projector</h1>
        <p>Plan your month based on your paycheck</p>
      </header>
      
      <main>
        {!showSummary ? (
          <Question
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            onBack={handleBack}
            currentStep={currentQuestion + 1}
            totalSteps={questions.length}
            previousAnswer={answers[questions[currentQuestion].id]}
          />
        ) : (
          <Summary 
            data={processedData} 
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}

export default App;
// App.tsx