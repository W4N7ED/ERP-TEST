
import { User } from "../types";
import { CURRENT_USER_KEY } from "../types";

/**
 * Service for handling storage operations (localStorage)
 */
export const storageService = {
  /**
   * Get user from localStorage
   */
  getUser: (): User | null => {
    const userString = localStorage.getItem(CURRENT_USER_KEY);
    if (userString) {
      try {
        return JSON.parse(userString) as User;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return null;
      }
    }
    return null;
  },

  /**
   * Save user to localStorage
   */
  saveUser: (user: User): void => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
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
  getAdminCredentials: (): { email: string; password: string } | null => {
    const credsString = localStorage.getItem('app_config');
    if (credsString) {
      try {
        const config = JSON.parse(credsString);
        if (config.adminConfig && config.adminConfig.email && config.adminConfig.password) {
          return {
            email: config.adminConfig.email,
            password: config.adminConfig.password
          };
        }
      } catch (error) {
        console.error('Error parsing admin credentials from localStorage:', error);
      }
    }
    return null;
  }
};
