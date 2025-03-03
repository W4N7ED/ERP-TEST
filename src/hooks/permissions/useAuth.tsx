
import { useState, useEffect } from 'react';
import { User } from './types';
import { CURRENT_USER_KEY } from './types';
import mockUsers, { defaultUser } from '@/data/mockUsers';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  // Récupérer l'utilisateur du localStorage au démarrage
  const getInitialUser = (): User => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      try {
        return JSON.parse(savedUser) as User;
      } catch (e) {
        // En cas d'erreur de parsing, utiliser l'utilisateur par défaut mais non authentifié
        return { ...defaultUser, isAuthenticated: false };
      }
    }
    // Par défaut, l'utilisateur n'est pas authentifié
    return { ...defaultUser, isAuthenticated: false };
  };

  const [currentUser, setCurrentUser] = useState<User & { isAuthenticated?: boolean }>(getInitialUser());
  const [allUsers, setAllUsers] = useState<User[]>(mockUsers);

  // Sauvegarder l'utilisateur dans localStorage quand il change
  useEffect(() => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  }, [currentUser]);

  // Check for Supabase session on load
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        try {
          // Get user profile and role from Supabase
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          const { data: userRole } = await supabase
            .from('user_roles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
            
          if (profile && userRole) {
            setCurrentUser({
              id: Number(session.user.id),
              name: profile.name,
              role: userRole.role,
              permissions: userRole.permissions,
              isAuthenticated: true
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          try {
            // Get user profile and role from Supabase
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            const { data: userRole } = await supabase
              .from('user_roles')
              .select('*')
              .eq('user_id', session.user.id)
              .single();
              
            if (profile && userRole) {
              setCurrentUser({
                id: Number(session.user.id),
                name: profile.name,
                role: userRole.role,
                permissions: userRole.permissions,
                isAuthenticated: true
              });
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        } else if (event === 'SIGNED_OUT') {
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
    // For backwards compatibility, continue to support mock users
    if (username === 'admin' && (password === 'admin123' || password === 'password123')) {
      const adminUser = allUsers.find(u => u.role === 'Administrateur');
      if (adminUser) {
        setCurrentUser({ ...adminUser, isAuthenticated: true });
        return true;
      }
    }
    
    // Check admin credentials from localStorage if available
    const adminCredentials = localStorage.getItem("admin_credentials");
    if (adminCredentials) {
      const credentials = JSON.parse(adminCredentials);
      // Si le nom d'utilisateur correspond à la première partie de l'email (avant @)
      const adminUsername = credentials.email.split('@')[0];
      if ((username === adminUsername || username === credentials.email) && password === credentials.password) {
        const adminUser = allUsers.find(u => u.role === 'Administrateur');
        if (adminUser) {
          setCurrentUser({ ...adminUser, isAuthenticated: true });
          return true;
        }
      }
    }
    
    try {
      // Try to login with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username.includes('@') ? username : `${username}@example.com`,
        password
      });
      
      if (error) throw error;
      
      if (data.session) {
        // Successfully logged in with Supabase
        try {
          // Get user profile and role
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
            
          const { data: userRole } = await supabase
            .from('user_roles')
            .select('*')
            .eq('user_id', data.session.user.id)
            .single();
            
          if (profile && userRole) {
            setCurrentUser({
              id: Number(data.session.user.id),
              name: profile.name,
              role: userRole.role,
              permissions: userRole.permissions,
              isAuthenticated: true
            });
            return true;
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      
      // For demo purposes only, try local mock users
      const user = allUsers.find(u => 
        u.name.toLowerCase() === username.toLowerCase()
      );
      
      if (user && password === 'password123') {
        setCurrentUser({ ...user, isAuthenticated: true });
        return true;
      }
      
      return false;
    }
  };

  // Logout user
  const logoutUser = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
    
    setCurrentUser({ ...defaultUser, isAuthenticated: false });
    localStorage.removeItem(CURRENT_USER_KEY);
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
      const { data, error } = await supabase.auth.admin.createUser({
        email: `${newUser.name.replace(/\s+/g, '').toLowerCase()}@example.com`,
        password: 'password123',
        email_confirm: true,
        user_metadata: { name: newUser.name }
      });
      
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
    addUser
  };
};
