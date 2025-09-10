import React, { useState } from 'react';
import SearchForm from '../components/customer/SearchForm';
import CustomerList from '../components/customer/CustomerList';
import CustomerForm from '../components/customer/CustomerForm';
import ConfirmModal from '../components/common/ConfirmModal';
import LoadingScreen from '../components/common/LoadingScreen';
import { searchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../api/customerService.js';

function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, customer: null });
  const [loadingMessage, setLoadingMessage] = useState('');

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
    setLoadingMessage('Agregando cliente...');
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
      setLoadingMessage('');
    }
  };

  const handleEditCustomer = async (customerId, customerData) => {
    setLoading(true);
    setLoadingMessage('Actualizando cliente...');
    setError(null);
    
    try {
      const updatedCustomer = await updateCustomer(customerId, customerData);
      // Actualizar el cliente en la lista
      setCustomers(prev => 
        prev.map(customer => 
          customer.id === customerId ? updatedCustomer : customer
        )
      );
    } catch (err) {
      setError('Error al actualizar cliente. Por favor, intente nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const handleStartEdit = (customer) => {
    setEditingCustomer(customer);
  };

  const handleCancelEdit = () => {
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (customer) => {
    setDeleteModal({ isOpen: true, customer });
  };

  const handleConfirmDelete = async () => {
    const { customer } = deleteModal;
    setLoading(true);
    setLoadingMessage('Eliminando cliente...');
    setError(null);
    
    try {
      await deleteCustomer(customer.id);
      // Eliminar el cliente de la lista
      setCustomers(prev => prev.filter(c => c.id !== customer.id));
      setDeleteModal({ isOpen: false, customer: null });
    } catch (err) {
      setError('Error al eliminar cliente. Por favor, intente nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, customer: null });
  };

  return (
    <div className="app">
      <h1>Clientes</h1>
      <CustomerForm 
        onAdd={handleAddCustomer} 
        onEdit={handleEditCustomer}
        loading={loading} 
        onToggleForm={setShowSearchForm}
        editingCustomer={editingCustomer}
        onCancelEdit={handleCancelEdit}
      />
      {showSearchForm && <SearchForm onSearch={handleSearch} loading={loading} />}
      
      {loading && <div className="loading">Buscando...</div>}
      {error && <div className="error">{error}</div>}
      
      {!loading && <CustomerList customers={customers} onEditCustomer={handleStartEdit} onDeleteCustomer={handleDeleteCustomer} />}
      
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que quieres eliminar a ${deleteModal.customer?.nombre}?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      
      <LoadingScreen 
        isVisible={loading} 
        message={loadingMessage}
      />
    </div>
  );
}

export default CustomerPage;