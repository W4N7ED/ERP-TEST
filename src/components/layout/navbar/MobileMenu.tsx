
import { useState } from "react";
import NavItems from "./NavItems";
import { usePermissions } from "@/hooks/usePermissions";

type MobileMenuProps = {
  isAdmin: boolean;
  isAuthenticated: boolean;
};

const MobileMenu = ({ isAdmin, isAuthenticated }: MobileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = usePermissions();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className="text-gray-600 hover:text-gray-800 focus:outline-none"
        onClick={toggleMenu}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {isMenuOpen && isAuthenticated && (
        <div className="fixed inset-0 z-50 bg-white animate-fade-in">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-medium">Menu</h3>
            <span className="text-sm text-muted-foreground ml-2">
              ({currentUser.role})
            </span>
            <button
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="bg-white shadow-inner">
            <NavItems 
              isAdmin={isAdmin} 
              isMobile={true} 
              isAuthenticated={isAuthenticated} 
              closeMenu={() => setIsMenuOpen(false)} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
