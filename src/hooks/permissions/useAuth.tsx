
import { useState, useEffect } from 'react';
import { User } from './types';
import { CURRENT_USER_KEY } from './types';
import mockUsers, { defaultUser } from '@/data/mockUsers';

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

  // Login user with username and password
  const loginUser = async (username: string, password: string): Promise<boolean> => {
    // Simulation d'un délai de connexion
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Connexion simplifiée pour le compte "admin"
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
    
    // Pour des fins de démonstration, on accepte n'importe quel nom qui existe dans mockUsers
    // et le mot de passe "password123"
    const user = allUsers.find(u => 
      u.name.toLowerCase() === username.toLowerCase()
    );
    
    if (user && password === 'password123') {
      setCurrentUser({ ...user, isAuthenticated: true });
      return true;
    }
    
    return false;
  };

  // Logout user
  const logoutUser = () => {
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
  const addUser = (newUser: Omit<User, 'id'>): User => {
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
    addUser
  };
};
