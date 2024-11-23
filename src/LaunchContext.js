import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LaunchContext = createContext();

export const useLaunches = () => {
  return useContext(LaunchContext);
};

export const LaunchProvider = ({ children }) => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLaunches = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('https://api.spacexdata.com/v4/launches');
        setLaunches(response.data.slice(0, 10)); // Exibe os primeiros 10 lançamentos
      } catch (error) {
        console.error("Erro ao buscar dados da API SpaceX:", error);
        setError("Erro ao buscar dados da API SpaceX.");
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  return (
    <LaunchContext.Provider value={{ launches, loading, error }}>
      {children}
    </LaunchContext.Provider>
  );
};