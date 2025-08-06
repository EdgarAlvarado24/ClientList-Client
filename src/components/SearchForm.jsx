import React, { useState } from 'react';

function SearchForm({ onSearch, loading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm, searchType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-controls">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={searchType === 'nombre' ? 'Nombre del cliente' : 'Número de teléfono'}
          disabled={loading}
        />
        
        <select 
          value={searchType} 
          onChange={(e) => setSearchType(e.target.value)}
          disabled={loading}
        >
          <option value="nombre">Buscar por nombre</option>
          <option value="telefono">Buscar por teléfono</option>
        </select>
        
        <button type="submit" disabled={loading || !searchTerm.trim()}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
    </form>
  );
}

export default SearchForm;