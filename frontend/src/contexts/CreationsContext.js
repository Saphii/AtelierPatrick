import React, { createContext, useContext, useState, useEffect } from 'react';
import { creationService } from '../services/api';

const CreationsContext = createContext();

export const useCreations = () => {
  const context = useContext(CreationsContext);
  if (!context) {
    throw new Error('useCreations must be used within a CreationsProvider');
  }
  return context;
};

export const CreationsProvider = ({ children }) => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchCreations = async () => {
    try {
      setLoading(true);
      const data = await creationService.getAll();
      
      // S'assurer que les données sont un tableau
      if (Array.isArray(data)) {
        setCreations(data);
      } else if (data && Array.isArray(data.results)) {
        setCreations(data.results);
      } else {
        setCreations([]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des créations:', error);
      setCreations([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshCreations = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const addCreation = (creation) => {
    setCreations(prev => [creation, ...prev]);
  };

  const updateCreation = (updatedCreation) => {
    setCreations(prev => 
      prev.map(creation => 
        creation.id === updatedCreation.id ? updatedCreation : creation
      )
    );
  };

  const removeCreation = (creationId) => {
    setCreations(prev => prev.filter(creation => creation.id !== creationId));
  };

  useEffect(() => {
    fetchCreations();
    
    // Écouter les événements de rafraîchissement
    const handleRefresh = () => {
      fetchCreations();
    };
    
    window.addEventListener('refreshCreations', handleRefresh);
    
    return () => {
      window.removeEventListener('refreshCreations', handleRefresh);
    };
  }, [refreshTrigger]);

  const value = {
    creations,
    loading,
    refreshCreations,
    addCreation,
    updateCreation,
    removeCreation,
    fetchCreations
  };

  return (
    <CreationsContext.Provider value={value}>
      {children}
    </CreationsContext.Provider>
  );
};
