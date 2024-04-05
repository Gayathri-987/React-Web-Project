import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ViewNotes from './components/ViewNotes';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" exact element={<Registration />} />
        <Route path="/register" exact element={<Registration />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/view-all-notes" element={<ViewNotes />} />
      </Routes>
    </Router>
  );
}

export default App;