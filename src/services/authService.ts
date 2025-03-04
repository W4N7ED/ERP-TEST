
import { User } from '@/types/permissions';
import { defaultUser } from '@/data/mockUsers';

// Local storage keys
const USER_KEY = 'auth_user';
const SESSION_KEY = 'auth_session';

export const authService = {
  // Check if the user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem(SESSION_KEY) !== null;
  },

  // Get the current session
  getSession: async () => {
    const sessionData = localStorage.getItem(SESSION_KEY);
    return {
      data: {
        session: sessionData ? JSON.parse(sessionData) : null
      }
    };
  },

  // Sign in with username and password
  signInWithPassword: async (email: string, password: string) => {
    const mockUsers = [
      { email: 'admin@example.com', password: 'admin123', role: 'Administrateur' },
      { email: 'tech@example.com', password: 'tech123', role: 'Technicien' },
      { email: 'manager@example.com', password: 'manager123', role: 'Gestionnaire' }
    ];

    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const session = {
        user: {
          id: email,
          email: email,
          user_metadata: { name: email.split('@')[0] }
        },
        expires_at: Date.now() + 86400000 // 24 hours from now
      };
      
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      localStorage.setItem(USER_KEY, JSON.stringify({
        ...defaultUser,
        name: email.split('@')[0],
        role: user.role,
        isAuthenticated: true
      }));
      
      return { data: { session }, error: null };
    } else {
      return { data: {}, error: { message: 'Invalid login credentials' } };
    }
  },

  // Sign out the current user
  signOut: async () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(USER_KEY);
    return { error: null };
  },

  // Subscribe to auth state changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    // This is a simplified implementation for the open source version
    // In a real implementation, this would use events to notify subscribers
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      setTimeout(() => {
        callback('SIGNED_IN', JSON.parse(session));
      }, 0);
    }
    
    return {
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    };
  },

  // Get user profile
  getUserProfile: async (userId: string) => {
    const userData = localStorage.getItem(USER_KEY);
    return {
      data: userData ? JSON.parse(userData) : null,
      error: null
    };
  },

  // Get user role
  getUserRole: async (userId: string) => {
    const userData = localStorage.getItem(USER_KEY);
    const user = userData ? JSON.parse(userData) : null;
    
    return {
      data: user ? {
        role: user.role,
        permissions: user.permissions
      } : null,
      error: null
    };
  },

  // Create a new user (admin only)
  createUser: async (email: string, password: string, metadata: any) => {
    const existingUsers = localStorage.getItem('mock_users') || '[]';
    const users = JSON.parse(existingUsers);
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      metadata
    };
    
    users.push(newUser);
    localStorage.setItem('mock_users', JSON.stringify(users));
    
    return {
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          user_metadata: newUser.metadata
        }
      },
      error: null
    };
  },

  // Transform user data to application User model
  transformToUser: (session: any, profile: any, userRole: any): User => {
    return {
      id: Number(session.user.id.replace(/\D/g, '')) || 1,
      name: profile.name,
      role: userRole.role,
      permissions: userRole.permissions,
      isAuthenticated: true
    };
  },

  // Get anonymous user
  getAnonymousUser: (): User => {
    return { ...defaultUser, isAuthenticated: false };
  }
};
