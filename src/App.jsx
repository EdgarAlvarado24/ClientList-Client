import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import CustomerList from './components/CustomerList';
import { searchCustomers } from './services/customerService.js';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm, searchType) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchCustomers(searchTerm, searchType);
      setCustomers(results);
    } catch (err) {
      setError('Error al buscar clientes. Por favor, intente nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Clientes</h1>
      <SearchForm onSearch={handleSearch} loading={loading} />
      
      {loading && <div className="loading">Buscando...</div>}
      {error && <div className="error">{error}</div>}
      
      <CustomerList customers={customers} />
    </div>
  );
}

export default App;