
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
import { usePermissions } from './hooks/usePermissions';

// Composant qui vérifie si l'utilisateur est administrateur avant d'afficher un composant protégé
const AdminRoute = ({ element }: { element: React.ReactNode }) => {
  const { currentUser } = usePermissions();
  const isAdmin = currentUser.role === "Administrateur";
  
  return isAdmin ? <>{element}</> : <Navigate to="/" replace />;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/interventions" element={<Interventions />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/users" element={<AdminRoute element={<Users />} />} />
        <Route path="/settings" element={<AdminRoute element={<Settings />} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/notifications" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
