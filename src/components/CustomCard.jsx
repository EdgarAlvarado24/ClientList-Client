import React from 'react';

function CustomerCard({ customer }) {
  return (
    <div className="customer-card">
      <h3>{customer.nombre}</h3>
      <div className="customer-details">
        <p><strong>Teléfono:</strong> {customer.telefono}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Dirección:</strong> {customer.address}</p>
      </div>
    </div>
  );
}

export default CustomerCard;