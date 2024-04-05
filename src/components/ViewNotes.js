import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import './ViewNotes.css'; // Import the CSS file

function ViewNotes() {
  const location = useLocation(); // Use useLocation hook to access location state
  const { userId } = location.state || {}; // Extract uuid from location state
  console.log(userId, "view");
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showDetails, setShowDetails] = useState({});
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/expenses/${userId}`);
      setExpenses(response.data);
      calculateTotalExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleToggleDetails = (expenseId) => {
    setShowDetails({
      ...showDetails,
      [expenseId]: !showDetails[expenseId]
    });
  };

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const filteredExpenses = expenses.filter(expense => {
    // If filterDate is provided and it doesn't match the expense date, exclude the expense
    if (filterDate && new Date(expense.date).toISOString().slice(0, 10) !== filterDate) {
      return false;
    }
    // If filterCategory is provided and it doesn't match the expense category, exclude the expense
    if (filterCategory && expense.category !== filterCategory) {
      return false;
    }
    // If no filters are applied or both filters match, include the expense
    return true;
  });
  
  const calculateTotalExpenses = (expenses) => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const total = expenses.reduce((accumulator, expense) => {
      const expenseDate = new Date(expense.date);
      if (expenseDate.getMonth() + 1 === currentMonth && expenseDate.getFullYear() === currentYear) {
        return accumulator + expense.amount;
      }
      return accumulator;
    }, 0);
    setTotalExpenses(total);
  };

  return (
    <div>
      <h1>View Your All Expenses</h1>
      <div className="total-expenses">
        <p>Total Expenses This Month: ₹{totalExpenses}</p>
      </div>
      <div className="filter-container">
        <div className="filter-row">
          <label>Date:</label>
          <input type="date" value={filterDate} onChange={handleDateChange} />
        </div>
        <div className="filter-row">
          <label>Category:</label>
          <select value={filterCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
      <option value="food">Food</option>
            <option value="shopping">Shopping</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
            <option value="bills">Bills</option>
            <option value="health">Health</option>
            <option value="housing">Housing</option>
            <option value="utilities">Utilities</option>
            <option value="education">Education</option>
            <option value="travel">Travel</option>
            <option value="personal">Personal</option>
            <option value="gifts">Gifts</option>
            <option value="donations">Donations</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="pets">Pets</option>
            <option value="other">Other</option>
            {/* Add more options for other categories */}
          </select>
        </div>
      </div>

      <div className="expenses-container">
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map(expense => (
            <div key={expense.id} className="expense-card">
              <div className="expense-header">
                <h2>{expense.category}</h2>
                <p>Date: {expense.date}</p>
                <p>Amount: {expense.amount}</p>
              </div>
              <div className="button-container">
                <button onClick={() => handleToggleDetails(expense.id)} className="show-details-button">
                  {showDetails[expense.id] ? "Hide Details" : "Show Details"}
                </button>
              </div>
              {showDetails[expense.id] && (
                <div className="expense-details">
                  <p>Category: {expense.category}</p>
                  <p>Other Category: {expense.otherCategory}</p>
                  <p>Date: {expense.date}</p>
                  <p>Amount: {expense.amount}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <h1>No Expenses Found</h1>
          )}
      </div>
    </div>
  );
}

export default ViewNotes;
