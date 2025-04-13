import React from 'react';

interface BudgetData {
  biweeklyPaycheck: number;
  monthlyBills: number;
  additionalExpenses: number;
}

interface SummaryProps {
  data: BudgetData;
  onReset: () => void;
}

const Summary: React.FC<SummaryProps> = ({ data, onReset }) => {
  // Calculate the projected monthly income (assuming 2 paychecks per month)
  const projectedMonthlyIncome = data.biweeklyPaycheck * 2;
  
  // Calculate total expenses
  const totalExpenses = data.monthlyBills + data.additionalExpenses;
  
  // Calculate wiggle room
  const wiggleRoom = projectedMonthlyIncome - totalExpenses;
  
  // Calculate daily spending allowance (divide wiggle room by 30 days)
  const dailyAllowance = wiggleRoom > 0 ? wiggleRoom / 30 : 0;
  
  // Calculate percentage of income that goes to bills and expenses
  const billsPercentage = projectedMonthlyIncome > 0 
    ? (data.monthlyBills / projectedMonthlyIncome) * 100 
    : 0;
    
  const expensesPercentage = projectedMonthlyIncome > 0 
    ? (data.additionalExpenses / projectedMonthlyIncome) * 100 
    : 0;
    
  const wiggleRoomPercentage = projectedMonthlyIncome > 0 
    ? (wiggleRoom / projectedMonthlyIncome) * 100 
    : 0;
  
  const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };
  
  return (
    <div className="summary-container">
      <h2>Your Monthly Budget Projection</h2>
      
      <div className="budget-summary">
        <div className="summary-section">
          <h3>Income</h3>
          <div className="summary-row">
            <span>Bi-weekly Paycheck:</span>
            <span>{formatCurrency(data.biweeklyPaycheck)}</span>
          </div>
          <div className="summary-row highlight">
            <span>Projected Monthly Income:</span>
            <span>{formatCurrency(projectedMonthlyIncome)}</span>
          </div>
        </div>
        
        <div className="summary-section">
          <h3>Expenses</h3>
          <div className="summary-row">
            <span>Monthly Bills ({billsPercentage.toFixed(1)}% of income):</span>
            <span>{formatCurrency(data.monthlyBills)}</span>
          </div>
          <div className="summary-row">
            <span>Additional Expenses ({expensesPercentage.toFixed(1)}% of income):</span>
            <span>{formatCurrency(data.additionalExpenses)}</span>
          </div>
          <div className="summary-row total">
            <span>Total Expenses:</span>
            <span>{formatCurrency(totalExpenses)}</span>
          </div>
        </div>
        
        <div className="summary-section result">
          <div className={`summary-row ${wiggleRoom >= 0 ? 'positive' : 'negative'}`}>
            <span>Monthly Wiggle Room ({Math.abs(wiggleRoomPercentage).toFixed(1)}% of income):</span>
            <span>{formatCurrency(wiggleRoom)}</span>
          </div>
          {wiggleRoom >= 0 ? (
            <div className="summary-row">
              <span>Daily Spending Allowance:</span>
              <span>{formatCurrency(dailyAllowance)}</span>
            </div>
          ) : (
            <div className="budget-warning">
              Your expenses exceed your income. Consider reviewing your budget.
            </div>
          )}
        </div>
      </div>
      
      <div className="action-buttons">
        <button onClick={onReset} className="reset-button">
          Start Over
        </button>
      </div>
    </div>
  );
};

export default Summary;