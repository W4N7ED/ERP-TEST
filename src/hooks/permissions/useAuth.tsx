
import { useState } from 'react';
import { User } from './types';
import { defaultUser } from '@/data/mockUsers';
import { storageService } from '@/services/storageService';
import { mockUserService } from './services/mockUserService';

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
    
    // Try mock authentication
    const mockUser = mockUserService.authenticateMockUser(username, password);
    if (mockUser) {
      console.log("User authenticated:", mockUser);
      setCurrentUser({...mockUser, isAuthenticated: true});
      storageService.saveUser({...mockUser, isAuthenticated: true});
      return true;
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
