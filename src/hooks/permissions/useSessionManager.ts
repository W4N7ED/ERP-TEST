
import { useState, useEffect } from 'react';
import { User } from './types';
import { authService } from './services/authService';
import { storageService } from './services/storageService';

export const useSessionManager = (getInitialUser: () => User) => {
  const [currentUser, setCurrentUser] = useState<User & { isAuthenticated?: boolean }>(getInitialUser());
  const [authError, setAuthError] = useState<string | null>(null);

  // Save user to localStorage when it changes
  useEffect(() => {
    console.log("Saving user to localStorage:", currentUser);
    storageService.saveUser(currentUser);
  }, [currentUser]);

  // Check for Supabase session on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await authService.getSession();
        
        if (session) {
          console.log("Session found:", session);
          try {
            // Get user profile and role from Supabase
            const { data: profile } = await authService.getUserProfile(session.user.id);
            const { data: userRole } = await authService.getUserRole(session.user.id);
              
            if (profile && userRole) {
              const userData = authService.transformToUser(session, profile, userRole);
              console.log("Setting user from session:", userData);
              setCurrentUser(userData);
            } else {
              console.log("Profile or role data missing");
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        } else {
          console.log("No active session found");
        }
      } catch (error) {
        console.error('Session check error:', error);
      }
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        if (event === 'SIGNED_IN' && session) {
          setAuthError(null); // Clear any previous errors
          try {
            // Get user profile and role from Supabase
            const { data: profile } = await authService.getUserProfile(session.user.id);
            const { data: userRole } = await authService.getUserRole(session.user.id);
              
            if (profile && userRole) {
              const userData = authService.transformToUser(session, profile, userRole);
              console.log("Setting user after sign in:", userData);
              setCurrentUser(userData);
            } else {
              console.log("No profile or role found after login");
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          setAuthError(null); // Clear any errors on sign out
          setCurrentUser({ ...getInitialUser(), isAuthenticated: false });
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [getInitialUser]);

  return {
    currentUser,
    setCurrentUser,
    authError,
    setAuthError
  };
};
