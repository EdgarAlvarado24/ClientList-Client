import React from 'react';
import CustomerCard from './CustomCard.jsx';

function CustomerList({ customers }) {
  if (customers.length === 0) {
    return <div className="no-results">No se encontraron clientes</div>;
  }

  return (
    <div className="customer-list">
      <h2>Resultados de la búsqueda ({customers.length})</h2>
      <div className="customer-grid">
        {customers.map(customer => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </div>
  );
}

export default CustomerList;