import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logoImage from '../assets/CGT transport.png';
import bandeauImage from '../assets/Bandeau-cgt.png';
import { AuthContext } from '../AuthContext';

const Header = () => {
  const { isLoggedIn, loading, login, logout, error: authError } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(username, password);
      setShowLogin(false);
      setUsername('');
      setPassword('');
      window.location.reload(); // Rafraîchir la page pour mettre à jour l'état
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
              <Link to="/#nos-equipe">Notre Équipe</Link>
              <Link to="/#qui-sommes-nous">Qui Sommes-Nous</Link>
            </div>
          </div>
          <div className="dropdown">
            <Link to="/actions" className="dropbtn">Nos Actions</Link>

            <div className="dropdown-content">
            <Link to="/actions#telechargement-section">Courriers</Link>
              <Link to="/actions#tract-section">Tracts</Link>
              <Link to="/actions#courrier-section">Photo</Link>
            </div>
          </div>
          <Link to="/droits">Vos Droits</Link>
          




          <div className="dropdown">
          <Link to="/accords">Accords</Link>
          <div className="dropdown-content">
              <Link to="/accords#accords">Accords</Link>
              <Link to="/accords#divers">Documents Divers</Link>
            </div></div>


          <Link to="/information">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="auth-buttons">
          <button onClick={isLoggedIn ? handleLogout : () => setShowLogin(true)}>
            {isLoggedIn ? 'Déconnexion' : 'Connexion'}
          </button>
        </div>
      </div>

      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <form className="login-form" onSubmit={handleLogin}>
              <h2>Login</h2>
              {(error || authError) && <p className="error-message">{error || authError}</p>}
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
