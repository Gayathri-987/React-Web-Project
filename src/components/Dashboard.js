import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import './Dashboard.css';

function Dashboard() {
  const location = useLocation(); // Use useLocation hook to access location state
  const { userId } = location.state || {}; // Extract uuid from location state
  console.log(userId, "dashboard1");
  const navigate = useNavigate()
  const [category, setCategory] = useState('');
  const [otherCategory, setOtherCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory === 'other') {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
      setOtherCategory('');
    }
  };

  const handleOtherCategoryChange = (e) => {
    setOtherCategory(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data object to send in the request
    const data = {
      uuid: userId,
      category,
      otherCategory: showOtherInput ? otherCategory : null,
      amount: parseFloat(amount), // Ensure amount is converted to a number
      date
    };
  
    try {
      // Make POST request to the API endpoint
      const response = await fetch('http://localhost:5000/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        setCategory('');
        setOtherCategory('');
        setAmount('');
        setDate('');
        alert('Expense added successfully');
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        alert('Failed to add expense. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleViewExpenses = () => {
    navigate('/view-all-notes',{state: { userId } });
  };
  
  return (
    <div>
    <div className="form-container">
    <h2 style={{ color:'#BD5FE9' }}>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category:</label>
          <select value={category} onChange={handleCategoryChange}>
          <option value="selectCategory">Select Category</option>
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
          </select>
        </div>
        {showOtherInput && (
          <div className="form-group">
            <label>Other Category:</label>
            <input type="text" value={otherCategory} onChange={handleOtherCategoryChange} />
          </div>
        )}
        <div className="form-group">
          <label>Amount:</label>
          <input type="number" value={amount} onChange={handleAmountChange} />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" value={date} onChange={handleDateChange} />
        </div>
        <div className="button-group">
          <button type="submit">Add Expense</button>
        </div>
      
      </form> 
    </div>
    <div>
        <button className="view-expenses-button" onClick={handleViewExpenses}>View Expenses</button>
      </div>
    </div>
  );
}

export default Dashboard;
