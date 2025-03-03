
import { useState, useEffect } from 'react';
import { User, Permission } from './types';
import { defaultUser } from '@/data/mockUsers';
import { authService } from './services/authService';
import { storageService } from './services/storageService';
import { mockUserService } from './services/mockUserService';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  // Get initial user from localStorage on startup
  const getInitialUser = (): User => {
    const savedUser = storageService.getUser();
    console.log("Initial user from storage:", savedUser);
    return savedUser || { ...defaultUser, isAuthenticated: false };
  };

  const [currentUser, setCurrentUser] = useState<User & { isAuthenticated?: boolean }>(getInitialUser());
  const [allUsers, setAllUsers] = useState<User[]>(mockUserService.getAllUsers());
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
          setCurrentUser({ ...defaultUser, isAuthenticated: false });
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login user with username and password
  const loginUser = async (username: string, password: string): Promise<boolean> => {
    console.log("Attempting login with:", username, password);
    setAuthError(null); // Clear any previous errors
    
    // Try mock authentication first for backward compatibility
    const mockUser = mockUserService.authenticateMockUser(username, password);
    if (mockUser) {
      console.log("Mock user authenticated:", mockUser);
      setCurrentUser({...mockUser, isAuthenticated: true});
      return true;
    }
    
    try {
      // Try to login with Supabase
      const email = username.includes('@') ? username : `${username}@example.com`;
      console.log("Attempting Supabase login with email:", email);
      
      const { data, error } = await authService.signInWithPassword(email, password);
      
      if (error) {
        console.error("Supabase login error:", error);
        setAuthError(error.message);
        throw error;
      }
      
      if (data.session) {
        console.log("Supabase session established:", data.session);
        // Successfully logged in with Supabase
        try {
          // Get user profile and role
          const { data: profile } = await authService.getUserProfile(data.session.user.id);
          const { data: userRole } = await authService.getUserRole(data.session.user.id);
            
          if (profile && userRole) {
            const userData = authService.transformToUser(data.session, profile, userRole);
            console.log("Setting user after Supabase login:", userData);
            setCurrentUser(userData);
            return true;
          } else {
            const errorMsg = "Profil ou rôle d'utilisateur non trouvé après connexion";
            console.error(errorMsg);
            setAuthError(errorMsg);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setAuthError('Erreur lors de la récupération des données utilisateur');
        }
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      if (!authError) {
        setAuthError('Erreur de connexion, veuillez réessayer');
      }
      return false;
    }
  };

  // Logout user
  const logoutUser = async () => {
    console.log("Logging out user");
    setAuthError(null); // Clear any errors on logout
    try {
      await authService.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
    
    setCurrentUser({ ...defaultUser, isAuthenticated: false });
    storageService.removeUser();
  };

  // Switch to a different user (for demonstration purposes)
  const switchUser = (userId: number) => {
    const user = allUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser({ ...user, isAuthenticated: true });
    }
  };

  // Add a new user (for configuration purposes)
  const addUser = async (newUser: Omit<User, 'id'>): Promise<User> => {
    try {
      // Create user in Supabase Auth
      const { data, error } = await authService.createUser(
        `${newUser.name.replace(/\s+/g, '').toLowerCase()}@example.com`,
        'password123',
        { name: newUser.name }
      );
      
      if (error) throw error;
      
      if (data.user) {
        // Update user role permissions
        const { error: roleError } = await supabase
          .from('user_roles')
          .update({ permissions: newUser.permissions })
          .eq('user_id', data.user.id);
          
        if (roleError) throw roleError;
        
        // Create local user object
        const id = Math.max(...allUsers.map(u => u.id), 0) + 1;
        const user: User = { id, ...newUser };
        setAllUsers(prev => [...prev, user]);
        return user;
      }
      
      throw new Error('Failed to create user');
    } catch (error) {
      console.error('Error creating user:', error);
      
      // Fallback to local mock user creation
      const id = Math.max(...allUsers.map(u => u.id), 0) + 1;
      const user: User = { id, ...newUser };
      setAllUsers(prev => [...prev, user]);
      return user;
    }
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
