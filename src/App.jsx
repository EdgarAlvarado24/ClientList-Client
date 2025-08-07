import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import CustomerList from './components/CustomerList';
import AddCustomerForm from './components/AddCustomerForm';
import { searchCustomers, createCustomer } from './services/customerService.js';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSearchForm, setShowSearchForm] = useState(true);

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

  const handleAddCustomer = async (customerData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newCustomer = await createCustomer(customerData);
      // Agregar el nuevo cliente a la lista actual
      setCustomers(prev => [newCustomer, ...prev]);
    } catch (err) {
      setError('Error al agregar cliente. Por favor, intente nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Clientes</h1>
      <AddCustomerForm 
        onAdd={handleAddCustomer} 
        loading={loading} 
        onToggleForm={setShowSearchForm}
      />
      {showSearchForm && <SearchForm onSearch={handleSearch} loading={loading} />}
      
      {loading && <div className="loading">Buscando...</div>}
      {error && <div className="error">{error}</div>}
      
      <CustomerList customers={customers} />
    </div>
  );
}

export default App;