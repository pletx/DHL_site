import React, { useState, useEffect } from 'react';

const LoginButton = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setShowLogin(false);
      } else {
        setError(data.message || 'Échec de la connexion');
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error('Échec de la déconnexion:', err);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <button className="btn-signout" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="btn-signin" onClick={() => setShowLogin(!showLogin)}>Login</button>
      )}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <form className="login-form" onSubmit={handleLogin}>
              <h2>Login</h2>
              {error && <p className="error-message">{error}</p>}
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
