
import { User } from './types';
import { authService } from './services/authService';
import { mockUserService } from './services/mockUserService';
import { defaultUser } from '@/data/mockUsers';

export const useAuthActions = (
  currentUser: User & { isAuthenticated?: boolean },
  setCurrentUser: React.Dispatch<React.SetStateAction<User & { isAuthenticated?: boolean }>>,
  setAuthError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  // Login user with username and password
  const loginUser = async (username: string, password: string): Promise<boolean> => {
    console.log("Attempting login with:", username, password);
    setAuthError(null); // Clear any previous errors
    
    // Try mock authentication first for backward compatibility
    const mockUser = mockUserService.authenticateMockUser(username, password);
    if (mockUser) {
      console.log("Mock user authenticated:", mockUser);
      setCurrentUser({...mockUser, isAuthenticated: true});
      return true;
    }
    
    try {
      // Try to login with Supabase
      const email = username.includes('@') ? username : `${username}@example.com`;
      console.log("Attempting Supabase login with email:", email);
      
      const { data, error } = await authService.signInWithPassword(email, password);
      
      if (error) {
        console.error("Supabase login error:", error);
        setAuthError(error.message);
        throw error;
      }
      
      if (data.session) {
        console.log("Supabase session established:", data.session);
        // Successfully logged in with Supabase
        try {
          // Get user profile and role
          const { data: profile } = await authService.getUserProfile(data.session.user.id);
          const { data: userRole } = await authService.getUserRole(data.session.user.id);
            
          if (profile && userRole) {
            const userData = authService.transformToUser(data.session, profile, userRole);
            console.log("Setting user after Supabase login:", userData);
            setCurrentUser(userData);
            return true;
          } else {
            const errorMsg = "Profil ou rôle d'utilisateur non trouvé après connexion";
            console.error(errorMsg);
            setAuthError(errorMsg);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setAuthError('Erreur lors de la récupération des données utilisateur');
        }
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      if (!setAuthError) {
        setAuthError('Erreur de connexion, veuillez réessayer');
      }
      return false;
    }
  };

  // Logout user
  const logoutUser = async () => {
    console.log("Logging out user");
    setAuthError(null); // Clear any errors on logout
    try {
      await authService.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
    
    setCurrentUser({ ...defaultUser, isAuthenticated: false });
    storageService.removeUser();
  };

  return {
    loginUser,
    logoutUser
  };
};

// Import storageService at the top
import { storageService } from './services/storageService';
