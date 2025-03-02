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
  ChevronLeft,
  Menu,
  Settings
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {isMobile ? (
          <button
            className="mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </button>
        ) : null}
        <Link to="/" className="font-bold text-xl md:text-2xl">
          EDR Solution
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          {/* <ModeToggle /> */}
        </div>
      </div>
      {/* Sidebar */}
      {(isSidebarOpen || !isMobile) && (
        <div className="w-64 border-r bg-secondary text-secondary-foreground">
          <div className="flex h-16 items-center px-4">
            {isMobile ? (
              <button
                className="mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={toggleSidebar}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            ) : null}
            <Link to="/" className="font-bold">
              EDR Solution
            </Link>
          </div>
          <nav className="flex flex-col space-y-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "group flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  location.pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};
