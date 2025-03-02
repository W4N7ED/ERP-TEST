
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { useEffect, useState } from 'react';
import Index from './pages/Index';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';
import Inventory from './pages/Inventory';
import Interventions from './pages/Interventions';
import Suppliers from './pages/Suppliers';
import Quotes from './pages/Quotes';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Configuration from './pages/Configuration';
import { usePermissions } from './hooks/usePermissions';

// Composant qui vérifie si l'utilisateur est administrateur avant d'afficher un composant protégé
const AdminRoute = ({ element }: { element: React.ReactNode }) => {
  const { currentUser } = usePermissions();
  const isAdmin = currentUser.role === "Administrateur";
  const isAuthenticated = currentUser.isAuthenticated;
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return isAdmin ? <>{element}</> : <Navigate to="/" replace />;
};

// Composant qui vérifie si l'utilisateur est authentifié avant d'afficher un composant protégé
const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const { currentUser } = usePermissions();
  const isAuthenticated = currentUser.isAuthenticated;
  
  return isAuthenticated ? <>{element}</> : <Navigate to="/login" replace />;
};

// Composant qui vérifie si l'application est configurée
const ConfiguredRoute = ({ element }: { element: React.ReactNode }) => {
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  
  useEffect(() => {
    const config = localStorage.getItem("app_config");
    if (config) {
      const parsedConfig = JSON.parse(config);
      setIsConfigured(parsedConfig.isConfigured);
    } else {
      setIsConfigured(false);
    }
  }, []);
  
  if (isConfigured === null) {
    // Still loading
    return null;
  }
  
  return isConfigured ? <>{element}</> : <Navigate to="/configure" replace />;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/configure" element={<Configuration />} />
        <Route path="/login" element={<ConfiguredRoute element={<Login />} />} />
        <Route path="/" element={<ConfiguredRoute element={<PrivateRoute element={<Index />} />} />} />
        <Route path="/projects" element={<ConfiguredRoute element={<PrivateRoute element={<Projects />} />} />} />
        <Route path="/inventory" element={<ConfiguredRoute element={<PrivateRoute element={<Inventory />} />} />} />
        <Route path="/interventions" element={<ConfiguredRoute element={<PrivateRoute element={<Interventions />} />} />} />
        <Route path="/quotes" element={<ConfiguredRoute element={<PrivateRoute element={<Quotes />} />} />} />
        <Route path="/suppliers" element={<ConfiguredRoute element={<PrivateRoute element={<Suppliers />} />} />} />
        <Route path="/users" element={<ConfiguredRoute element={<AdminRoute element={<Users />} />} />} />
        <Route path="/settings" element={<ConfiguredRoute element={<AdminRoute element={<Settings />} />} />} />
        <Route path="/profile" element={<ConfiguredRoute element={<PrivateRoute element={<Profile />} />} />} />
        <Route path="/profile/notifications" element={<ConfiguredRoute element={<PrivateRoute element={<Profile />} />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
