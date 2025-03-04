
import { User, Permission } from '@/hooks/permissions/types';
import { defaultUser } from '@/data/mockUsers';

// Simple in-memory user store
let currentSession: {
  user: User | null;
  token: string | null;
} = {
  user: null,
  token: null
};

export const authService = {
  /**
   * Get the current session
   */
  getSession: async () => {
    return {
      data: {
        session: currentSession.token ? {
          user: currentSession.user,
          token: currentSession.token
        } : null
      },
      error: null
    };
  },

  /**
   * Sign in with email and password
   */
  signInWithPassword: async (email: string, password: string) => {
    // This is a mock implementation
    // In a real app, you would validate credentials against your database
    
    // Simple mock validation - accept any credentials matching basic format
    if (email && password && password.length >= 6) {
      // Create a mock token
      const token = `token_${Math.random().toString(36).slice(2)}_${Date.now()}`;
      
      // Create a mock user based on email
      const user = {
        id: Date.now(),
        email,
        name: email.split('@')[0],
      };
      
      currentSession = {
        user,
        token
      };
      
      return {
        data: {
          session: {
            user,
            token
          }
        },
        error: null
      };
    }
    
    return {
      data: { session: null },
      error: {
        message: "Identifiants invalides"
      }
    };
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
    currentSession = { user: null, token: null };
    return { error: null };
  },

  /**
   * Subscribe to auth state changes
   */
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    // In a real implementation, this would set up event listeners
    // For the mock, we return a dummy subscription object
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            // Do nothing in the mock
          }
        }
      }
    };
  },

  /**
   * Get user profile
   */
  getUserProfile: async (userId: string) => {
    // Mock implementation
    return {
      data: {
        name: currentSession.user?.name || 'Unknown User',
        id: userId
      },
      error: null
    };
  },

  /**
   * Get user role
   */
  getUserRole: async (userId: string) => {
    // Mock implementation
    return {
      data: {
        role: 'Administrateur',
        permissions: [
          'inventory.view', 'inventory.add', 'inventory.edit', 'inventory.delete',
          'projects.view', 'projects.add', 'projects.edit',
          'interventions.view', 'interventions.add', 'interventions.edit'
        ] as Permission[]
      },
      error: null
    };
  },

  /**
   * Create a new user (admin only)
   */
  createUser: async (email: string, password: string, metadata: any) => {
    // Mock implementation
    return {
      data: {
        user: {
          id: Date.now().toString(),
          email,
          ...metadata
        }
      },
      error: null
    };
  },

  /**
   * Transform user data to application User model
   */
  transformToUser: (session: any, profile: any, userRole: any): User => {
    return {
      id: typeof session.user.id === 'string' 
          ? parseInt(session.user.id, 10) 
          : session.user.id,
      name: profile.name,
      role: userRole.role,
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
