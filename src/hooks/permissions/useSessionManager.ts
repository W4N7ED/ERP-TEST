
import { useState, useEffect } from 'react';
import { User } from './types';
import { storageService } from './services/storageService';

export const useSessionManager = (getInitialUser: () => User) => {
  const [currentUser, setCurrentUser] = useState<User & { isAuthenticated?: boolean }>(getInitialUser());
  const [authError, setAuthError] = useState<string | null>(null);

  // Save user to localStorage when it changes
  useEffect(() => {
    console.log("Saving user to localStorage:", currentUser);
    storageService.saveUser(currentUser);
  }, [currentUser]);

  return {
    currentUser,
    setCurrentUser,
    authError,
    setAuthError
  };
};
