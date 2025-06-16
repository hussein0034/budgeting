import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import './App.css';

function App() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Check for specific credentials
    if (email === 'husseinaegh9@gmail.com' && password === 'moonsun1') {
      try {
        await login(email, password);
        setError('');
      } catch (error) {
        setError('Login failed. Please try again.');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        <div className="login-container">
          <h1>Budgeting App</h1>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
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
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Balance</h3>
              <p>$0.00</p>
            </div>
            <div className="stat-card">
              <h3>Income</h3>
              <p>$0.00</p>
            </div>
            <div className="stat-card">
              <h3>Expenses</h3>
              <p>$0.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 