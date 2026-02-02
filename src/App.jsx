// App.jsx
import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import HousingProjectPage from './pages/HousingProjectPage';
import ChurnPredictionPage from './pages/ChurnPredictionPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onBack={() => setCurrentPage('home')} />;
      case 'housing':
        return <HousingProjectPage onBack={() => setCurrentPage('home')} />;
      case 'churn':
        return <ChurnPredictionPage onBack={() => setCurrentPage('home')} />;
      default:
        return (
          <HomePage
            onShowDashboard={() => setCurrentPage('dashboard')}
            onShowHousing={() => setCurrentPage('housing')}
            onShowChurn={() => setCurrentPage('churn')}
          />
        );
    }
  };

  return <>{renderPage()}</>;
};

export default App;