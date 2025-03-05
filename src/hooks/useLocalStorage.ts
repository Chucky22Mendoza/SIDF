import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  // Estado para almacenar el valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Buscar el valor inicial en el Local Storage
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error leyendo Local Storage:', error);
      return initialValue;
    }
  });

  // Función para actualizar el valor en el estado y el Local Storage
  const setValue = (value: Function | string) => {
    try {
      // Si el valor es una función, ejecutarla para obtener el nuevo valor
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Guardar el valor en el estado
      setStoredValue(valueToStore);

      // Guardar el valor en el Local Storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error guardando en Local Storage:', error);
    }
  };

  useEffect(() => {
    // Sincronización en caso de que Local Storage cambie desde otra pestaña
    const handleStorageChange = () => {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
