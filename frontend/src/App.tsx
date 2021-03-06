import React from 'react';
import { StorageProvider } from './hooks/storage';
import Dashboard from './pages/Dashboard';
import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyles />
    <StorageProvider>
      <Dashboard />
    </StorageProvider>
  </>
);

export default App;
