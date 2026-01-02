import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import SchedulingPage from './components/SchedulingPage';
import { authenticateUser } from './db/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username, password) => {
    const result = authenticateUser(username, password);
    if (result.success) {
      setCurrentUser(result.username);
      setIsAuthenticated(true);
      setError('');
      localStorage.setItem('currentUser', result.username);
    } else {
      setError(result.error);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setError('');
    setCurrentPage('dashboard');
    localStorage.removeItem('currentUser');
  };

  const handleNavigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full h-screen">
      {isAuthenticated ? (
        currentPage === 'dashboard' ? (
          <DashboardPage user={currentUser} onLogout={handleLogout} onNavigateTo={handleNavigateTo} />
        ) : (
          <SchedulingPage onNavigateTo={handleNavigateTo} onLogout={handleLogout} />
        )
      ) : (
        <LoginPage onLogin={handleLogin} error={error} />
      )}
    </div>
  );
}

export default App;
