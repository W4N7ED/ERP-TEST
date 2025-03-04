
import { User } from '../types';
import mockUsers from '@/data/mockUsers';
import { storageService } from './storageService';

/**
 * Service for handling mock user operations (for backward compatibility)
 */
export const mockUserService = {
  /**
   * Get all mock users
   */
  getAllUsers: (): User[] => {
    // Return empty array or just the admin user
    return mockUsers;
  },

  /**
   * Authenticate with mock credentials
   */
  authenticateMockUser: (username: string, password: string): User | null => {
    console.log("Authenticating with:", username);
    
    // Check admin credentials from localStorage
    const adminCredentials = storageService.getAdminCredentials();
    if (adminCredentials) {
      console.log("Checking saved admin credentials");
      const adminUsername = adminCredentials.email.split('@')[0];
      if ((username === adminUsername || username === adminCredentials.email) && 
          password === adminCredentials.password) {
        console.log("Saved admin credentials match");
        const adminUser = mockUsers.find(u => u.role === 'Administrateur');
        if (adminUser) {
          return { ...adminUser, isAuthenticated: true };
        }
      }
    }
    
    console.log("No matching credentials found");
    return null;
  }
};
