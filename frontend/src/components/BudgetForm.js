// frontend/src/components/BudgetForm.js

import React, { useState } from 'react';
import axios from '../api'; // Assuming axios is configured in api.js

const BudgetForm = () => {
  const [budgetName, setBudgetName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/budgets', {
        name: budgetName,
        amount: parseFloat(amount)
      });
      console.log('Budget created:', response.data);
      // Handle success (e.g., show success message, update state)
    } catch (error) {
      console.error('Error creating budget:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>Add New Budget</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Budget Name:
          <input
            type="text"
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Budget</button>
      </form>
    </div>
  );
};

export default BudgetForm;
