import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';

const LoginButton = ({ setShowLogin }) => {
  const { isLoggedIn, loading, login, logout } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
    setShowLogin(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </>
  );
};

export default LoginButton;
