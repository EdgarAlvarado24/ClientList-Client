import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import './assets/styles/App.css';
import UserPage from './pages/UserPage';
import NavBar from './components/common/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<CustomerPage />} />
        <Route path="/users" element={<UserPage />} />
        {/* Add a route for Settings when the page is created */}
        {/* <Route path="/settings" element={<div>Settings Page</div>} /> */}
      </Routes>
    </>
  );
}

export default App;