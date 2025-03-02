
import { User, UserRole, Permission } from './types';

export const useUserManagement = (
  allUsers: User[], 
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>,
  currentUser: User & { isAuthenticated?: boolean },
  setCurrentUser: React.Dispatch<React.SetStateAction<User & { isAuthenticated?: boolean }>>
) => {
  // Ajouter un nouvel utilisateur
  const addUser = (user: Omit<User, 'id'>) => {
    const newUser: User = {
      id: Math.max(...allUsers.map(user => user.id)) + 1,
      ...user
    };
    
    const updatedUsers = [...allUsers, newUser];
    setAllUsers(updatedUsers);
    return newUser;
  };
  
  // Supprimer un utilisateur
  const removeUser = (userId: number) => {
    const updatedUsers = allUsers.filter(user => user.id !== userId);
    setAllUsers(updatedUsers);
  };
  
  // Mettre à jour un utilisateur existant
  const updateUser = (userId: number, updates: Partial<Omit<User, 'id'>>) => {
    const updatedUsers = allUsers.map(user => {
      if (user.id === userId) {
        return { ...user, ...updates };
      }
      return user;
    });
    
    setAllUsers(updatedUsers);
    
    // Si l'utilisateur actuel est modifié, mettez-le également à jour
    if (currentUser.id === userId) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  return {
    addUser,
    removeUser,
    updateUser
  };
};
