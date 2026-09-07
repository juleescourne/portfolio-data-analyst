import { lazy, Suspense, useEffect, useState } from 'react';
import HomePage from './pages/HomePage';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const HousingProjectPage = lazy(() => import('./pages/HousingProjectPage'));
const ChurnPredictionPage = lazy(() => import('./pages/ChurnPredictionPage'));

const getRouteFromHash = () => {
  const hash = window.location.hash || '';
  if (!hash.startsWith('#/')) return 'home';
  return hash.slice(2) || 'home';
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => setCurrentPage(getRouteFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentPage !== 'home') window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentPage]);

  const navigate = (page) => {
    if (page === 'home') {
      window.location.hash = '';
      setCurrentPage('home');
      return;
    }
    window.location.hash = `/${page}`;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'goodreads':
        return <DashboardPage onBack={() => navigate('home')} />;
      case 'housing':
        return <HousingProjectPage onBack={() => navigate('home')} />;
      case 'churn':
        return <ChurnPredictionPage onBack={() => navigate('home')} />;
      default:
        return <HomePage onShowProject={navigate} />;
    }
  };

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Chargement du projet…</div>}>
      {renderPage()}
    </Suspense>
  );
};

export default App;
