
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
    console.log("Authenticating mock user:", username);
    
    // Check specific admin credentials for admin@admin.fr
    if ((username === 'admin@admin.fr') && 
        (password === 'admin123')) {
      console.log("Special admin credentials match");
      const adminUser = mockUsers.find(u => u.role === 'Administrateur');
      if (adminUser) {
        return { ...adminUser, isAuthenticated: true };
      }
    }
    
    // Check standard admin credentials
    if ((username === 'admin' || username === 'admin@example.com') && 
        (password === 'admin123' || password === 'password123')) {
      console.log("Standard admin credentials match");
      const adminUser = mockUsers.find(u => u.role === 'Administrateur');
      if (adminUser) {
        return { ...adminUser, isAuthenticated: true };
      }
    }
    
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
    
    // Check other mock users
    const user = mockUsers.find(u => 
      u.name.toLowerCase() === username.toLowerCase() ||
      `${u.name.toLowerCase()}@example.com` === username.toLowerCase()
    );
    
    if (user && password === 'password123') {
      console.log("Regular user credentials match:", user.name);
      return { ...user, isAuthenticated: true };
    }
    
    console.log("No matching mock credentials found");
    return null;
  }
};
