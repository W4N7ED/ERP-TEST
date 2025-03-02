
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Wrench, 
  Package, 
  FolderKanban, 
  FileText, 
  Users,
  Settings,
  User,
  Bell,
  LogOut,
  LogIn
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePermissions } from "@/hooks/usePermissions";

type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  adminOnly?: boolean;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { currentUser, logoutUser } = usePermissions();
  
  const isAdmin = currentUser.role === "Administrateur";
  const isAuthenticated = currentUser.isAuthenticated;

  const navItems: NavItem[] = [
    { label: "Tableau de bord", icon: <LayoutDashboard size={20} />, href: "/" },
    { label: "Interventions", icon: <Wrench size={20} />, href: "/interventions" },
    { label: "Inventaire", icon: <Package size={20} />, href: "/inventory" },
    { label: "Projets", icon: <FolderKanban size={20} />, href: "/projects" },
    { label: "Devis", icon: <FileText size={20} />, href: "/quotes" },
    { label: "Utilisateurs", icon: <Users size={20} />, href: "/users", adminOnly: true },
    { label: "Paramètres", icon: <Settings size={20} />, href: "/settings", adminOnly: true },
  ];

  // Filtrer les éléments de navigation en fonction du rôle
  const filteredNavItems = navItems.filter(item => (!item.adminOnly || isAdmin) && isAuthenticated);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="font-bold text-xl md:text-2xl mr-8">
          EDR Solution
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && isAuthenticated && (
          <nav className="flex items-center space-x-1 overflow-x-auto hide-scrollbar">
            {filteredNavItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <span>{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            ))}
          </nav>
        )}
        
        {/* Mobile Navigation - Hamburger menu toggle */}
        {isMobile && isAuthenticated && (
          <>
            <button
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </>
        )}
        
        <div className="ml-auto flex items-center space-x-4">
          {/* Login Button for not authenticated users */}
          {!isAuthenticated && (
            <Button onClick={handleLogin} className="flex items-center gap-2">
              <LogIn size={16} />
              <span>Se connecter</span>
            </Button>
          )}
          
          {/* User Profile Dropdown for authenticated users*/}
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg" alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.role}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Mon profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile/notifications" className="flex items-center w-full">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem>
                      <Link to="/settings" className="flex items-center w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && isAuthenticated && isMenuOpen && (
        <div className="bg-white border-b shadow-inner animate-fade-in">
          <nav className="flex flex-col px-4 py-2">
            {filteredNavItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 px-2 py-3 text-sm border-b border-gray-100 last:border-0",
                  location.pathname === item.href
                    ? "text-primary font-medium"
                    : "text-gray-700"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-gray-500">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
