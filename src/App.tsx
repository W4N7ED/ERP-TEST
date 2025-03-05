
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
import HR from './pages/HR';
import { usePermissions } from './hooks/usePermissions';
import { ThemeProvider } from './components/ThemeProvider';
import { AppNameProvider } from './components/AppNameProvider';

const AdminRoute = ({ element }: { element: React.ReactNode }) => {
  const { currentUser } = usePermissions();
  const location = useLocation();
  const isAdmin = currentUser.role === "Administrateur";
  const isAuthenticated = currentUser.isAuthenticated;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return isAdmin ? <>{element}</> : <Navigate to="/" replace />;
};

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const { currentUser } = usePermissions();
  const location = useLocation();
  const isAuthenticated = currentUser.isAuthenticated;
  
  return isAuthenticated ? <>{element}</> : <Navigate to="/login" state={{ from: location }} replace />;
};

const PermissionRoute = ({ element, permission }: { element: React.ReactNode, permission: string }) => {
  const { currentUser, hasPermission } = usePermissions();
  const location = useLocation();
  const isAuthenticated = currentUser.isAuthenticated;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return hasPermission(permission as any) ? <>{element}</> : <Navigate to="/" replace />;
};

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
        setIsConfigured(false);
      }
    } else {
      setIsConfigured(false);
    }
  }, []);
  
  if (isConfigured === null) {
    return null;
  }
  
  return isConfigured ? <>{element}</> : <Navigate to="/configure" replace />;
};

function App() {
  const { currentUser } = usePermissions();
  
  useEffect(() => {
    console.log("État d'authentification:", currentUser.isAuthenticated);
    console.log("Utilisateur:", currentUser);
  }, [currentUser]);

  return (
    <ThemeProvider>
      <AppNameProvider>
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
          <Route path="/hr" element={<PermissionRoute element={<HR />} permission="hr.view" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AppNameProvider>
    </ThemeProvider>
  );
}

export default App;
