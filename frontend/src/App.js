// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BudgetForm from './components/BudgetForm';
import TransactionList from './components/TransactionList';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/add-budget" component={BudgetForm} />
          <Route path="/transactions" component={TransactionList} />
          {/* Add more routes as needed */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
