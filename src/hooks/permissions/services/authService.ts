
import { supabase } from '@/integrations/supabase/client';
import { User, Permission } from '../types';
import { defaultUser } from '@/data/mockUsers';

/**
 * Service for handling Supabase authentication operations
 */
export const authService = {
  /**
   * Get the current session from Supabase
   */
  getSession: async () => {
    return await supabase.auth.getSession();
  },

  /**
   * Sign in with email and password
   */
  signInWithPassword: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
    return await supabase.auth.signOut();
  },

  /**
   * Subscribe to auth state changes
   */
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  /**
   * Get user profile from Supabase
   */
  getUserProfile: async (userId: string) => {
    return await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
  },

  /**
   * Get user role from Supabase
   */
  getUserRole: async (userId: string) => {
    return await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .single();
  },

  /**
   * Create a new user (admin only)
   */
  createUser: async (email: string, password: string, metadata: any) => {
    return await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: metadata
    });
  },

  /**
   * Transform Supabase user data to application User model
   */
  transformToUser: (session: any, profile: any, userRole: any): User => {
    return {
      id: Number(session.user.id),
      name: profile.name,
      role: userRole.role,
      // Cast string[] to Permission[] since we know they are valid permissions
      permissions: userRole.permissions as Permission[],
      isAuthenticated: true
    };
  },

  /**
   * Get anonymous user
   */
  getAnonymousUser: (): User => {
    return { ...defaultUser, isAuthenticated: false };
  }
};
