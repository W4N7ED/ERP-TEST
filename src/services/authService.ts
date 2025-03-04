
import type { User } from '@/hooks/permissions/types';

/**
 * Service d'authentification pour gérer les utilisateurs dans l'application
 */
export const authService = {
  /**
   * Connexion avec email et mot de passe
   */
  login: async (email: string, password: string): Promise<{ user: User | null; error: Error | null }> => {
    try {
      // Chercher l'utilisateur dans le stockage local
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => {
        // Generate email from username for comparison since User type doesn't have email
        const generatedEmail = `${u.name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
        return generatedEmail === email;
      });

      if (!user) {
        return { user: null, error: new Error("Utilisateur non trouvé") };
      }

      // Vérification du mot de passe (simplifiée)
      if (user.password !== password) {
        return { user: null, error: new Error("Mot de passe incorrect") };
      }

      // Utilisateur authentifié
      const authenticatedUser: User = {
        id: user.id,
        name: user.name,
        role: user.role || "Utilisateur",
        permissions: user.permissions || []
      };

      // Stocker la session en cours
      localStorage.setItem("current_user", JSON.stringify(authenticatedUser));
      
      return { user: authenticatedUser, error: null };
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return { user: null, error: error instanceof Error ? error : new Error("Erreur inconnue") };
    }
  },

  /**
   * Déconnexion de l'utilisateur actuel
   */
  logout: async (): Promise<void> => {
    try {
      localStorage.removeItem("current_user");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  },

  /**
   * Vérifie si un utilisateur est connecté
   */
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem("current_user");
  },

  /**
   * Récupère l'utilisateur actuellement connecté
   */
  getCurrentUser: (): User | null => {
    try {
      const userJson = localStorage.getItem("current_user");
      return userJson ? JSON.parse(userJson) as User : null;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur actuel:", error);
      return null;
    }
  }
};
