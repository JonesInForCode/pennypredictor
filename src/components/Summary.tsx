import React from 'react';

interface SummaryProps {
  answers: { [key: number]: string };
  payFrequency: boolean;
}

const Summary: React.FC<SummaryProps> = ({ answers, payFrequency }) => {
  const totalIncome = parseFloat(answers[1] || '0');
  const payPeriods = payFrequency ? 4 : 2;
  const totalBills = parseFloat(answers[2] || '0');
  const totalExpenditures = parseFloat(answers[3] || '0');
  const wiggleRoom = totalIncome - (totalBills + totalExpenditures);
  
  return (
    <div>
      <h2>Summary</h2>
      <p>Projected Income: ${totalIncome.toFixed(2)}</p>
      <p>Pay Periods: {payPeriods}</p>
      <p>Projected Bills: ${totalBills.toFixed(2)}</p>
      <p>Projected Expenditures: ${totalExpenditures.toFixed(2)}</p>
      <p>Wiggle Room: ${wiggleRoom.toFixed(2)}</p>
    </div>);
};

export default Summary;