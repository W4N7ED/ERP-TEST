
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Shapes, 
  Wrench, 
  FileStack, 
  Users, 
  Settings, 
  Building, 
  GanttChart,
  UserRound
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: JSX.Element;
}

interface NavItemsProps {
  isAdmin: boolean;
  isMobile: boolean;
  isAuthenticated: boolean;
  closeMenu?: () => void;
}

const navItems: NavItem[] = [
  {
    href: '/',
    label: 'Dashboard',
    icon: <LayoutDashboard className="mr-2 h-5 w-5" />,
  },
  {
    href: '/inventory',
    label: 'Inventory',
    icon: <Shapes className="mr-2 h-5 w-5" />,
  },
  {
    href: '/interventions',
    label: 'Interventions',
    icon: <Wrench className="mr-2 h-5 w-5" />,
  },
  {
    href: '/projects',
    label: 'Projects',
    icon: <GanttChart className="mr-2 h-5 w-5" />,
  },
  {
    href: '/quotes',
    label: 'Quotes',
    icon: <FileStack className="mr-2 h-5 w-5" />,
  },
  {
    href: '/suppliers',
    label: 'Suppliers',
    icon: <Building className="mr-2 h-5 w-5" />,
  },
  {
    href: '/users',
    label: 'Users',
    icon: <Users className="mr-2 h-5 w-5" />,
  },
  {
    href: '/hr',
    label: 'HR',
    icon: <UserRound className="mr-2 h-5 w-5" />,
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: <Settings className="mr-2 h-5 w-5" />,
  },
];

export function NavItems({ isAdmin, isMobile, isAuthenticated, closeMenu }: NavItemsProps) {
  const location = useLocation();
  
  const handleClick = () => {
    if (isMobile && closeMenu) {
      closeMenu();
    }
  };
  
  return (
    <div className="flex items-center gap-3 md:gap-5">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          onClick={handleClick}
          className={cn(
            'flex items-center gap-1 text-sm font-medium text-foreground/60 hover:text-foreground',
            location.pathname === item.href && 'text-foreground'
          )}
        >
          {item.icon}
          <span className={cn(isMobile ? 'inline' : 'hidden md:inline')}>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
