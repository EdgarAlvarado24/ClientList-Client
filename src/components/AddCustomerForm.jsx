import React, { useState } from 'react';

function AddCustomerForm({ onAdd, loading, onToggleForm }) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    address: ''
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onAdd) {
      await onAdd(formData);
      setFormData({
        nombre: '',
        telefono: '',
        email: '',
        address: ''
      });
      setShowForm(false);
      if (onToggleForm) onToggleForm(true);
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: '',
      telefono: '',
      email: '',
      address: ''
    });
    setShowForm(false);
    if (onToggleForm) onToggleForm(true);
  };

  if (!showForm) {
    return (
      <div>
        <button 
          className="add-customer-btn"
          onClick={() => {
            setShowForm(true);
            if (onToggleForm) onToggleForm(false);
          }}
          disabled={loading}
        >
          Agregar
        </button>
      </div>
    );
  }

  return (
    <div className="add-customer-section">
      <h3>Agregar Nuevo Cliente</h3>
      <form onSubmit={handleSubmit} className="add-customer-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Dirección:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={loading}
            rows="3"
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Agregando...' : 'Agregar Cliente'}
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomerForm; 