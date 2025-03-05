
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Index from './pages/Index';
import Inventory from './pages/Inventory';
import Interventions from './pages/Interventions';
import Projects from './pages/Projects';
import Quotes from './pages/Quotes';
import Suppliers from './pages/Suppliers';
import Users from './pages/Users';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Configuration from './pages/Configuration';
import HR from './pages/HR';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import { AppNameProvider } from './components/AppNameProvider';

function App() {
  return (
    <AppNameProvider>
      <ThemeProvider>
        <Navbar />
        <main className="min-h-screen pb-8 pt-[60px]">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/interventions" element={<Interventions />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/configuration" element={<Configuration />} />
            <Route path="/hr" element={<HR />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Toaster position="bottom-right" />
      </ThemeProvider>
    </AppNameProvider>
  );
}

export default App;
