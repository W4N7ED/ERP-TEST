
import { User } from '../types';
import { CURRENT_USER_KEY } from '../types';

/**
 * Service for handling localStorage operations
 */
export const storageService = {
  /**
   * Save user to localStorage
   */
  saveUser: (user: User): void => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  },

  /**
   * Get user from localStorage
   */
  getUser: (): User | null => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      try {
        return JSON.parse(savedUser) as User;
      } catch (e) {
        // In case of parsing error, return null
        return null;
      }
    }
    return null;
  },

  /**
   * Remove user from localStorage
   */
  removeUser: (): void => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  /**
   * Get admin credentials from localStorage
   */
  getAdminCredentials: () => {
    const adminCredentials = localStorage.getItem("admin_credentials");
    if (adminCredentials) {
      try {
        return JSON.parse(adminCredentials);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
};
