const API_URL = 'http://localhost:5000/api/customers';

export const searchCustomers = async (searchTerm, searchType) => {
  try {
    // Asegúrate de que los parámetros coincidan con lo que espera el backend
    const response = await fetch(`${API_URL}/search?searchTerm=${encodeURIComponent(searchTerm)}&searchType=${searchType}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al buscar clientes');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en customerService:', error);
    throw error;
  }
};

export const createCustomer = async (customerData) => {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear cliente');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en customerService:', error);
    throw error;
  }
};