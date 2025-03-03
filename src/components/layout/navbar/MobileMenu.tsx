
import { useState } from "react";
import NavItems from "./NavItems";

type MobileMenuProps = {
  isAdmin: boolean;
  isAuthenticated: boolean;
};

const MobileMenu = ({ isAdmin, isAuthenticated }: MobileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="bg-white border-b shadow-inner animate-fade-in">
          <NavItems 
            isAdmin={isAdmin} 
            isMobile={true} 
            isAuthenticated={isAuthenticated} 
            closeMenu={() => setIsMenuOpen(false)} 
          />
        </div>
      )}
    </>
  );
};

export default MobileMenu;
