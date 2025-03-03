
import { User } from './types';
import { authService } from './services/authService';
import { supabase } from '@/integrations/supabase/client';

export const useUserCreation = (
  allUsers: User[],
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
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
    addUser
  };
};
