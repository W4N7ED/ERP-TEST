
import { useState } from 'react';
import { User } from './types';
import { defaultUser } from '@/data/mockUsers';
import { storageService } from '@/services/storageService';
import { mockUserService } from './services/mockUserService';
import { shouldUseMockData } from '@/utils/databaseCheck';

export const useAuth = () => {
  // Get initial user from localStorage on startup
  const getInitialUser = (): User => {
    const savedUser = storageService.getUser();
    console.log("Initial user from storage:", savedUser);
    return savedUser || { ...defaultUser, isAuthenticated: false };
  };

  // State
  const [currentUser, setCurrentUser] = useState<User & { isAuthenticated?: boolean }>(getInitialUser());
  const [allUsers, setAllUsers] = useState<User[]>(mockUserService.getAllUsers());
  const [authError, setAuthError] = useState<string | null>(null);

  // Login user with username and password
  const loginUser = async (username: string, password: string): Promise<boolean> => {
    console.log("Attempting login with:", username, password);
    setAuthError(null); // Clear any previous errors
    
    // Try mock authentication if we should use mock data
    if (shouldUseMockData()) {
      const mockUser = mockUserService.authenticateMockUser(username, password);
      if (mockUser) {
        console.log("User authenticated with mock data:", mockUser);
        setCurrentUser({...mockUser, isAuthenticated: true});
        storageService.saveUser({...mockUser, isAuthenticated: true});
        return true;
      }
    } else {
      // If using real database, check admin credentials from configuration
      const adminCredentials = storageService.getAdminCredentials();
      if (adminCredentials) {
        const adminUsername = adminCredentials.email.split('@')[0];
        if ((username === adminUsername || username === adminCredentials.email) && 
            password === adminCredentials.password) {
          console.log("Admin credentials match");
          
          // Create admin user
          const adminUser: User = {
            id: 1,
            name: adminCredentials.name || "Administrateur",
            role: "Administrateur",
            permissions: [
              // Include all permissions for admin
              'inventory.view', 'inventory.add', 'inventory.edit', 'inventory.delete',
              'suppliers.view', 'suppliers.add', 'suppliers.edit', 'suppliers.delete',
              'movements.view', 'movements.add', 'movements.approve',
              'projects.view', 'projects.add', 'projects.edit', 'projects.delete',
              'interventions.view', 'interventions.add', 'interventions.edit', 'interventions.delete',
              'users.view', 'users.add', 'users.edit', 'users.delete',
              'quotes.view', 'quotes.add', 'quotes.edit', 'quotes.delete',
              'clients.view', 'clients.add', 'clients.edit', 'clients.delete',
              'hr.view', 'hr.employees.view', 'hr.employees.add', 'hr.employees.edit'
            ]
          };
          
          setCurrentUser({...adminUser, isAuthenticated: true});
          storageService.saveUser({...adminUser, isAuthenticated: true});
          return true;
        }
      }
    }
    
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

  // Switch user (for demo/development purposes)
  const switchUser = (userId: number) => {
    // Only allow switching users in mock mode
    if (!shouldUseMockData()) {
      console.log("User switching is disabled when using real database");
      return;
    }
    
    const user = allUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser({...user, isAuthenticated: true});
      storageService.saveUser({...user, isAuthenticated: true});
    }
  };

  // Add a new user (for configuration purposes)
  const addUser = async (newUser: Omit<User, 'id'>): Promise<User> => {
    const id = Math.max(...allUsers.map(u => u.id), 0) + 1;
    const user: User = { id, ...newUser };
    setAllUsers(prev => [...prev, user]);
    return user;
  };

  return {
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUsers,
    loginUser,
    logoutUser,
    switchUser,
    addUser,
    authError
  };
};
