
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Wrench, 
  Package, 
  FolderKanban, 
  Receipt, 
  Users,
  Menu,
  Settings,
  ChevronDown
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Tableau de bord", icon: <LayoutDashboard size={20} />, href: "/" },
  { label: "Interventions", icon: <Wrench size={20} />, href: "/interventions" },
  { label: "Inventaire", icon: <Package size={20} />, href: "/inventory" },
  { label: "Projets", icon: <FolderKanban size={20} />, href: "/projects" },
  { label: "Devis/Factures", icon: <Receipt size={20} />, href: "/invoices" },
  { label: "Utilisateurs", icon: <Users size={20} />, href: "/users" },
  { label: "Paramètres", icon: <Settings size={20} />, href: "/settings" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="flex h-16 items-center px-4">
        {isMobile ? (
          <button
            className="mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={toggleMenu}
          >
            <Menu className="h-6 w-6" />
          </button>
        ) : null}
        
        <Link to="/" className="font-bold text-xl md:text-2xl">
          EDR Solution
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center ml-8">
            <div className="relative group">
              <button 
                onClick={toggleMenu}
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                <span>Menu</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isMenuOpen ? "rotate-180" : "")} />
              </button>
              
              {isMenuOpen && (
                <div className="absolute left-0 mt-2 w-60 bg-white border rounded-md shadow-lg z-50 animate-fade-in">
                  <div className="py-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className={cn(
                          "flex items-center space-x-2 px-4 py-3 text-sm hover:bg-gray-100",
                          location.pathname === item.href
                            ? "bg-gray-100 text-primary font-medium"
                            : "text-gray-700"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-gray-500">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        )}
        
        <div className="ml-auto flex items-center space-x-4">
          {/* Additional header items can go here */}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="bg-white border-b shadow-inner animate-fade-in">
          <nav className="flex flex-col px-4 py-2">
            {navItems.map((item) => (
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
