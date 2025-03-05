import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Wrench, 
  Package, 
  FolderKanban, 
  FileText, 
  Settings,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePermissions } from "@/hooks/usePermissions";

export type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  adminOnly?: boolean;
  permissions?: string[];
};

export const getNavItems = (): NavItem[] => [
  { label: "Tableau de bord", icon: <LayoutDashboard size={20} />, href: "/" },
  { label: "Interventions", icon: <Wrench size={20} />, href: "/interventions" },
  { label: "Inventaire", icon: <Package size={20} />, href: "/inventory" },
  { label: "Projets", icon: <FolderKanban size={20} />, href: "/projects" },
  { label: "Devis", icon: <FileText size={20} />, href: "/quotes" },
  { 
    label: "Ressources Humaines", 
    icon: <Users size={20} />, 
    href: "/hr",
    permissions: ["hr.view"] 
  },
  { label: "Paramètres", icon: <Settings size={20} />, href: "/settings", adminOnly: true },
];

type NavItemsProps = {
  isAdmin: boolean;
  isMobile: boolean;
  isAuthenticated: boolean;
  closeMenu?: () => void;
};

const NavItems = ({ isAdmin, isMobile, isAuthenticated, closeMenu }: NavItemsProps) => {
  const location = useLocation();
  const navItems = getNavItems();
  const { hasPermission } = usePermissions();
  
  const filteredNavItems = navItems.filter(item => {
    if (!isAuthenticated) return false;
    if (item.adminOnly && !isAdmin) return false;
    
    // If it's an admin, always show items regardless of specific permissions
    if (isAdmin) return true;
    
    // Otherwise, check for specific permissions
    if (item.permissions && !item.permissions.some(permission => hasPermission(permission as any))) return false;
    return true;
  });

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {!isMobile ? (
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
      ) : (
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
              onClick={closeMenu}
            >
              <span className="text-gray-500">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
};

export default NavItems;
