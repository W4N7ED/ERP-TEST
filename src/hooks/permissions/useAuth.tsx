
import { useState } from 'react';
import { User } from './types';
import { defaultUser } from '@/data/mockUsers';
import { storageService } from './services/storageService';
import { mockUserService } from './services/mockUserService';
import { useSessionManager } from './useSessionManager';
import { useAuthActions } from './useAuthActions';
import { useUserSwitching } from './useUserSwitching';
import { useUserCreation } from './useUserCreation';

export const useAuth = () => {
  // Get initial user from localStorage on startup
  const getInitialUser = (): User => {
    const savedUser = storageService.getUser();
    console.log("Initial user from storage:", savedUser);
    return savedUser || { ...defaultUser, isAuthenticated: false };
  };

  const [allUsers, setAllUsers] = useState<User[]>(mockUserService.getAllUsers());
  
  const { currentUser, setCurrentUser, authError, setAuthError } = useSessionManager(getInitialUser);
  const { loginUser, logoutUser } = useAuthActions(currentUser, setCurrentUser, setAuthError);
  const { switchUser } = useUserSwitching(allUsers, setCurrentUser);
  const { addUser } = useUserCreation(allUsers, setAllUsers);

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
