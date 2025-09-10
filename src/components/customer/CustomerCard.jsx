import React from 'react';

function CustomerCard({ customer, onEdit, onDelete }) {
  return (
    <div className="customer-card">
      <div className="customer-header">
        <h3>{customer.nombre}</h3>
        <div className="customer-actions">
          <button 
            className="add-customer-btn"
            onClick={() => onEdit(customer)}
            title="Editar cliente"
          >
            Editar
          </button>
          <button 
            className="add-customer-btn delete-btn"
            onClick={() => onDelete(customer)}
            title="Eliminar cliente"
          >
            Eliminar
          </button>
        </div>
      </div>
      <div className="customer-details">
        <p><strong>Teléfono:</strong> {customer.telefono}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Dirección:</strong> {customer.address}</p>
      </div>
    </div>
  );
}

export default CustomerCard;