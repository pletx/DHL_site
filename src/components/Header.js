import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImage from '../assets/CGT transport.png';
import bandeauImage from '../assets/Bandeau-cgt.png';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setShowLogin(false);
        setUsername('');  // Réinitialiser le champ
        setPassword('');  // Réinitialiser le champ
        window.location.reload();  // Recharger la page après connexion
      } else {
        setError(data.message || 'Échec de la connexion');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }, [username, password]);

  const handleLogout = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.reload();  // Recharger la page après déconnexion
      }
    } catch (err) {
      console.error('Déconnexion échouée :', err);
    }
  }, []);

  return (
    <header className="header">
      <img src={bandeauImage} alt="Bandeau" className="bandeau-image" />
      <div className='header-content'>
        <div className="logo">
          <Link to="/">
            <img src={logoImage} alt="Logo" className="logo-image" />
          </Link>
        </div>
        <nav className="nav-links">
          <div className="dropdown">
            <Link to="/" className="dropbtn">Home</Link>
            <div className="dropdown-content">
              <Link to="/#nos-equipe">Nos Équipe</Link>
              <Link to="/#qui-sommes-nous">Qui Sommes-Nous</Link>
            </div>
          </div>
          <div className="dropdown">
            <Link to="/actions" className="dropbtn">Nos Actions</Link>
            <div className="dropdown-content">
              <Link to="/actions#courrier-section">Courriers</Link>
              <Link to="/actions#tract-section">Tracts</Link>
              <Link to="/actions#telechargement-section">Téléchargements</Link>
            </div>
          </div>
          <Link to="/droits">Nos Droits</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="auth-buttons">
          {isLoggedIn ? (
            <button className="btn-signout" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="btn-signin" onClick={() => setShowLogin(!showLogin)}>Login</button>
          )}
        </div>
      </div>
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <form className="login-form" onSubmit={handleLogin}>
              <h2>Login</h2>
              {error && <p className="error-message">{error}</p>}
              <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur :</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de passe :</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={loading}>{loading ? 'Chargement...' : 'Login'}</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
