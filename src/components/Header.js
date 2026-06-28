import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logoImage from '../assets/CGT transport.png';
import bandeauImage from '../assets/Bandeau-cgt.png';
import { AuthContext } from '../AuthContext';

const Header = () => {
  const { isLoggedIn, loading, login, logout, error: authError } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu mobile burger
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('sessionExpired') === '1') {
      setShowLogin(true);
      setError('Votre session a expiré. Veuillez vous reconnecter.');
      params.delete('sessionExpired');
      const newSearch = params.toString();
      window.history.replaceState({}, '', `${location.pathname}${newSearch ? `?${newSearch}` : ''}`);
    }
  }, [location.search, location.pathname]);

  // Ferme le menu mobile à chaque changement de page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      setShowLogin(false);
      setUsername('');
      setPassword('');
      window.location.reload();
    } catch (err) {
      setError(err?.message || 'Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
      setError('Erreur lors de la déconnexion. Veuillez réessayer.');
    }
  };

  return (
    <header className="header">
      <div className="bandeau-container">
        <img src={bandeauImage} alt="Bandeau CGT" className="bandeau-image" />
      </div>
      
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <img src={logoImage} alt="Logo" className="logo-image" />
          </Link>
        </div>

        {/* Bouton Burger pour le mobile */}
        <button 
          className={`burger-menu ${isMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu de navigation"
        >
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </button>

        {/* Navigation principale */}
        <nav className={`nav-links ${isMenuOpen ? 'nav-active' : ''}`}>
          <div className="dropdown">
            <Link to="/" className="dropbtn">Accueil <i className="fa-solid fa-chevron-down arrow-icon"></i></Link>
            <div className="dropdown-content">
              <a href="/#nos-equipe">Notre Équipe</a>
              <a href="/#qui-sommes-nous">Qui Sommes-Nous</a>
            </div>
          </div>

          <div className="dropdown">
            <Link to="/actions" className="dropbtn">Nos Actions <i className="fa-solid fa-chevron-down arrow-icon"></i></Link>
            <div className="dropdown-content">
              <a href="/actions#telechargement-section">Courriers</a>
              <a href="/actions#tract-section">Tracts</a>
              <a href="/actions#courrier-section">Photos</a>
            </div>
          </div>

          <Link to="/droits" className="nav-item">Vos Droits</Link>

          <div className="dropdown">
            <Link to="/accords" className="dropbtn">Accords <i className="fa-solid fa-chevron-down arrow-icon"></i></Link>
            <div className="dropdown-content">
              <a href="/accords#accords">Accords</a>
              <a href="/accords#divers">Documents Divers</a>
            </div>
          </div>

          <Link to="/information" className="nav-item">FAQ</Link>
          <Link to="/contact" className="nav-item">Contact</Link>
          
          <div className="auth-buttons-mobile">
            <button className="btn-auth" onClick={isLoggedIn ? handleLogout : () => setShowLogin(true)}>
              {isLoggedIn ? 'Déconnexion' : 'Connexion'}
            </button>
          </div>
        </nav>

        {/* Bouton d'authentification Desktop */}
        <div className="auth-buttons-desktop">
          <button className="btn-auth" onClick={isLoggedIn ? handleLogout : () => setShowLogin(true)}>
            <i className={`fa-solid ${isLoggedIn ? 'fa-sign-out-alt' : 'fa-user'}`}></i>
            {isLoggedIn ? 'Déconnexion' : 'Connexion'}
          </button>
        </div>
      </div>

      {/* Fenêtre Modale de Connexion */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowLogin(false)}>&times;</button>
            <form className="login-form" onSubmit={handleLogin}>
              <h2>Connexion</h2>
              {(error || authError) && <p className="error-message">{error || authError}</p>}
              <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Ex: jean.dupont"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Chargement...' : 'Se connecter'}
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;