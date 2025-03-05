
/**
 * Service for handling storage operations (localStorage)
 */
export const storageService = {
  /**
   * Save data to localStorage
   */
  saveData: (key: string, data: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving data to localStorage with key ${key}:`, error);
    }
  },

  /**
   * Get data from localStorage
   */
  getData: (key: string): any => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error getting data from localStorage with key ${key}:`, error);
      return null;
    }
  },

  /**
   * Remove data from localStorage
   */
  removeData: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data from localStorage with key ${key}:`, error);
    }
  },

  /**
   * Get user from localStorage
   */
  getUser: (): any | null => {
    return storageService.getData('current_user');
  },

  /**
   * Save user to localStorage
   */
  saveUser: (user: any): void => {
    storageService.saveData('current_user', user);
  },

  /**
   * Remove user from localStorage
   */
  removeUser: (): void => {
    storageService.removeData('current_user');
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
