
import { User } from '../types';
import mockUsers from '@/data/mockUsers';
import { storageService } from '@/services/storageService';
import { shouldUseMockData } from '@/utils/databaseCheck';

/**
 * Service for handling mock user operations (for backward compatibility)
 */
export const mockUserService = {
  /**
   * Get all mock users
   */
  getAllUsers: (): User[] => {
    // If using a real database and not mock data, return just the admin user
    if (!shouldUseMockData()) {
      // Return only the admin user or empty array when using real DB
      const adminUser = mockUsers.find(u => u.role === 'Administrateur');
      return adminUser ? [adminUser] : [];
    }
    
    // Return mock users for development
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
    
    // If not using mock data, don't check against mock users
    if (!shouldUseMockData()) {
      console.log("Using real database, mock authentication disabled");
      return null;
    }
    
    console.log("No matching credentials found");
    return null;
  }
};
