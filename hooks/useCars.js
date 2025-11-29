import { useState, useEffect } from 'react';

export function useCars(filters = {}) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCars();
  }, [JSON.stringify(filters)]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters);
      const response = await fetch(`/api/cars?${params}`);
      const result = await response.json();

      if (result.success) {
        setCars(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { cars, loading, error, refetch: fetchCars };
}

export async function createCar(carData) {
  const response = await fetch('/api/cars', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData)
  });
  return response.json();
}

export async function updateCar(id, carData) {
  const response = await fetch(`/api/cars/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData)
  });
  return response.json();
}

export async function deleteCar(id) {
  const response = await fetch(`/api/cars/${id}`, {
    method: 'DELETE'
  });
  return response.json();
}

export async function trackWhatsAppClick(id) {
  await fetch(`/api/cars/${id}/whatsapp-click`, { method: 'POST' });
}