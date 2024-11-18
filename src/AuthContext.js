import React, { createContext, useState, useEffect, useContext } from 'react';
const apiUrl = process.env.REACT_APP_API_URL;
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
    try {
      const response = await fetch(`${ process.env.REACT_APP_API_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Utilisation correcte de username
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
      } else {
        throw new Error(data.message || 'Échec de la connexion');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour la déconnexion
  const logout = async () => {
    try {
      const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
      if (!token) {
        throw new Error('No token found');
      }
      const response = await fetch(`${ process.env.REACT_APP_API_URL}/api/admin/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Inclusion correcte du token dans les en-têtes
        },
      });

      if (response.ok) {
        localStorage.removeItem('token'); // Supprimer le token après une déconnexion réussie
        setIsLoggedIn(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to logout');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Fournir le contexte aux composants enfants
  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
