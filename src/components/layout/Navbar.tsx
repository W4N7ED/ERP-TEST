
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Wrench, 
  Package, 
  FolderKanban, 
  Receipt, 
  Users, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

export function Navbar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm" 
          : "bg-white"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <span className="font-bold text-xl text-primary">EDR</span>
            <span className="font-medium">TechManager</span>
          </Link>
        </div>

        {isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        ) : (
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-16 animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
