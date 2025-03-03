
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
    return mockUsers;
  },

  /**
   * Authenticate with mock credentials
   */
  authenticateMockUser: (username: string, password: string): User | null => {
    // Check admin credentials
    if (username === 'admin' && (password === 'admin123' || password === 'password123')) {
      const adminUser = mockUsers.find(u => u.role === 'Administrateur');
      if (adminUser) {
        return { ...adminUser, isAuthenticated: true };
      }
    }
    
    // Check admin credentials from localStorage
    const adminCredentials = storageService.getAdminCredentials();
    if (adminCredentials) {
      const adminUsername = adminCredentials.email.split('@')[0];
      if ((username === adminUsername || username === adminCredentials.email) && password === adminCredentials.password) {
        const adminUser = mockUsers.find(u => u.role === 'Administrateur');
        if (adminUser) {
          return { ...adminUser, isAuthenticated: true };
        }
      }
    }
    
    // Check other mock users
    const user = mockUsers.find(u => 
      u.name.toLowerCase() === username.toLowerCase()
    );
    
    if (user && password === 'password123') {
      return { ...user, isAuthenticated: true };
    }
    
    return null;
  }
};
