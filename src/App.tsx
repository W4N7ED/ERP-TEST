
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const isAdmin = currentUser.role === "Administrateur";
  const isAuthenticated = currentUser.isAuthenticated;
  
  if (!isAuthenticated) {
    // Enregistrer l'emplacement actuel pour rediriger après la connexion
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return isAdmin ? <>{element}</> : <Navigate to="/" replace />;
};

// Composant qui vérifie si l'utilisateur est authentifié avant d'afficher un composant protégé
const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const { currentUser } = usePermissions();
  const location = useLocation();
  const isAuthenticated = currentUser.isAuthenticated;
  
  return isAuthenticated ? <>{element}</> : <Navigate to="/login" state={{ from: location }} replace />;
};

// Composant qui vérifie si l'application est configurée
const ConfiguredRoute = ({ element }: { element: React.ReactNode }) => {
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  
  useEffect(() => {
    const config = localStorage.getItem("app_config");
    if (config) {
      try {
        const parsedConfig = JSON.parse(config);
        setIsConfigured(parsedConfig.isConfigured);
      } catch (error) {
        console.error("Error parsing app configuration:", error);
        // Marquer comme configuré par défaut pour donner priorité à la connexion
        setIsConfigured(true);
      }
    } else {
      // Marquer comme configuré par défaut pour donner priorité à la connexion
      setIsConfigured(true);
    }
  }, []);
  
  if (isConfigured === null) {
    // Still loading
    return null;
  }
  
  return isConfigured ? <>{element}</> : <Navigate to="/configure" replace />;
};

function App() {
  const { currentUser } = usePermissions();
  
  useEffect(() => {
    // Pour déboguer l'état d'authentification
    console.log("État d'authentification:", currentUser.isAuthenticated);
    console.log("Utilisateur:", currentUser);
  }, [currentUser]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<ConfiguredRoute element={<Login />} />} />
        <Route path="/configure" element={<Configuration />} />
        <Route path="/" element={<PrivateRoute element={<Index />} />} />
        <Route path="/projects" element={<PrivateRoute element={<Projects />} />} />
        <Route path="/inventory" element={<PrivateRoute element={<Inventory />} />} />
        <Route path="/interventions" element={<PrivateRoute element={<Interventions />} />} />
        <Route path="/quotes" element={<PrivateRoute element={<Quotes />} />} />
        <Route path="/suppliers" element={<PrivateRoute element={<Suppliers />} />} />
        <Route path="/users" element={<AdminRoute element={<Users />} />} />
        <Route path="/settings" element={<AdminRoute element={<Settings />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/profile/notifications" element={<PrivateRoute element={<Profile />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
