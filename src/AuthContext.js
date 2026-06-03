import React, { createContext, useState, useEffect, useContext } from 'react';
import api, { getApiErrorMessage } from './api';

// Créer le contexte d'authentification
export const AuthContext = createContext();

// Créer le hook personnalisé pour accéder au contexte
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

// Définir le provider d'authentification
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Vérifier si l'utilisateur est connecté à partir du token local
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fonction pour la connexion
  const login = async (username, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/api/admin/auth/login', { username, password });
      const data = response.data;
      const token = data.token || data.accessToken || data.access_token;

      if (response.status === 200 && token) {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
      } else {
        const message = data.message || 'Échec de la connexion';
        setError(message);
        throw new Error(message);
      }
    } catch (error) {
      const message = getApiErrorMessage(error);
      setError(message);
      console.error('Erreur de connexion:', error);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour la déconnexion
  const logout = async () => {
    try {
      setError('');
      await api.post('/api/admin/auth/logout');
      localStorage.removeItem('token'); // Supprimer le token après une déconnexion réussie
      setIsLoggedIn(false);
    } catch (error) {
      const message = getApiErrorMessage(error);
      setError(message);
      console.error('Erreur lors de la déconnexion:', error);
      throw new Error(message);
    }
  };

  // Fournir le contexte aux composants enfants
  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
