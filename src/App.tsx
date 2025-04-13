import React, { useState } from "react";
import Question from "./components/Question.tsx";
import Summary from "./components/Summary.tsx";

interface QuestionType {
  id: number;
  text: string;
}

interface Answer {
  [key: number]: string | boolean;
}

const questions: QuestionType[] = [
  {
    id: 1,
    text: "What is your expected income on your first paycheck of the month?",
  },
  { id: 2, text: "How often do you get paid?" },
  { id: 3, text: "What are your expected bills?" },
  { id: 4, text: "What are your expected expenditures?" },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer>({});
  const [payFrequency, setPayFrequency] = useState(false); // weekly = true, bi-weekly = false

  const handleAnswer = (id: number, answer: string | boolean) => {
    if (id === 2) {
      if (answer as boolean) {
        setPayFrequency(answer as boolean);
      } else {
        console.error("Invalid answer type");
      }
    }
    setAnswers({ ...answers, [id]: answer });
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div>
      {currentQuestion < questions.length ? (
        <Question
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          type={currentQuestion === 1 ? "radio" : "text"}
          options={currentQuestion === 1 ? ["Weekly", "Bi-Weekly"] : []}
        />
      ) : (
        <Summary
          answers={Object.fromEntries(
            Object.entries(answers).map(([key, value]) => [key, String(value)])
          )}
          payFrequency={payFrequency}
        />
      )}
    </div>
  );
}

export default App;
