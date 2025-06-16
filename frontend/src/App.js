import React from 'react';
import { useAuth } from './contexts/AuthContext';
import './App.css';

function App() {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await login(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        <div className="login-container">
          <h1>Budgeting App</h1>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Welcome, {user?.name || 'User'}!</h1>
          <button onClick={logout} className="logout-button">Logout</button>
        </header>
        <div className="dashboard-content">
          <h2>Your Budget Dashboard</h2>
          {/* Add your dashboard content here */}
        </div>
      </div>
    </div>
  );
}

export default App; 