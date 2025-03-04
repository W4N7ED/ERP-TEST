
import { User } from './types';
import { mockUserService } from './services/mockUserService';
import { defaultUser } from '@/data/mockUsers';
import { storageService } from './services/storageService';

export const useAuthActions = (
  currentUser: User & { isAuthenticated?: boolean },
  setCurrentUser: React.Dispatch<React.SetStateAction<User & { isAuthenticated?: boolean }>>,
  setAuthError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  // Login user with username and password
  const loginUser = async (username: string, password: string): Promise<boolean> => {
    console.log("Attempting login with:", username, password);
    setAuthError(null); // Clear any previous errors
    
    // Try mock authentication
    const mockUser = mockUserService.authenticateMockUser(username, password);
    if (mockUser) {
      console.log("Mock user authenticated:", mockUser);
      setCurrentUser({...mockUser, isAuthenticated: true});
      return true;
    }
    
    // No authentication methods succeeded
    setAuthError('Identifiants incorrects');
    return false;
  };

  // Logout user
  const logoutUser = async () => {
    console.log("Logging out user");
    setAuthError(null); // Clear any errors on logout
    setCurrentUser({ ...defaultUser, isAuthenticated: false });
    storageService.removeUser();
  };

  return {
    loginUser,
    logoutUser
  };
};
