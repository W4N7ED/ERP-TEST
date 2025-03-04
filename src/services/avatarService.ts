
import { v4 as uuidv4 } from "uuid";

/**
 * Service pour gérer les opérations liées aux avatars
 */
export const avatarService = {
  /**
   * Stocke un avatar dans le localStorage
   */
  uploadAvatar: async (file: File): Promise<{ url: string | null; error: Error | null }> => {
    try {
      if (!file) {
        return { url: null, error: new Error("Aucun fichier fourni") };
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith("image/")) {
        return { url: null, error: new Error("Le fichier doit être une image") };
      }

      // Limiter la taille du fichier à 2MB
      if (file.size > 2 * 1024 * 1024) {
        return { url: null, error: new Error("La taille de l'image ne doit pas dépasser 2MB") };
      }

      // Convertir le fichier en Data URL
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          // Sauvegarder l'image dans le localStorage
          const avatarId = uuidv4();
          localStorage.setItem(`avatar_${avatarId}`, dataUrl);
          resolve({ url: dataUrl, error: null });
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'avatar:", error);
      return { url: null, error: error instanceof Error ? error : new Error("Erreur inconnue") };
    }
  },

  /**
   * Met à jour l'URL de l'avatar pour l'utilisateur actuel
   */
  updateUserAvatarUrl: async (avatarUrl: string): Promise<{ success: boolean; error: Error | null }> => {
    try {
      // Sauvegarder l'URL de l'avatar dans le localStorage
      localStorage.setItem("current_user_avatar", avatarUrl);
      return { success: true, error: null };
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'URL de l'avatar:", error);
      return { success: false, error: error instanceof Error ? error : new Error("Erreur inconnue") };
    }
  }
};
