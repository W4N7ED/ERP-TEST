
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePermissions } from "@/hooks/usePermissions";
import { useAppName } from "@/components/AppNameProvider";
import UserDropdown from "./navbar/UserDropdown";
import { NavItems } from "./navbar/NavItems";
import LoginButton from "./navbar/LoginButton";
import MobileMenu from "./navbar/MobileMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { currentUser } = usePermissions();
  const { appName } = useAppName();
  
  const isAdmin = currentUser.role === "Administrateur";
  const isAuthenticated = currentUser.isAuthenticated;

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="font-bold text-xl md:text-2xl mr-8">
          {appName}
        </Link>
        
        {!isMobile && <NavItems isAdmin={isAdmin} isMobile={false} isAuthenticated={isAuthenticated} />}
        
        {isMobile && isAuthenticated && <MobileMenu isAdmin={isAdmin} isAuthenticated={isAuthenticated} />}
        
        <div className="ml-auto flex items-center space-x-4">
          {!isAuthenticated && <LoginButton handleLogin={handleLogin} />}
          {isAuthenticated && <UserDropdown />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
