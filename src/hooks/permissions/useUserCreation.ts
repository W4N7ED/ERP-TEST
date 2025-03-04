
import { User } from './types';

export const useUserCreation = (
  allUsers: User[],
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
  // Add a new user (for configuration purposes)
  const addUser = async (newUser: Omit<User, 'id'>): Promise<User> => {
    try {
      // Local user creation (offline mode)
      const id = Math.max(...allUsers.map(u => u.id), 0) + 1;
      const user: User = { id, ...newUser };
      setAllUsers(prev => [...prev, user]);
      return user;
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
