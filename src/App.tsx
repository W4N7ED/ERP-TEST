
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
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
