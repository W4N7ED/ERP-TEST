
/**
 * Service pour gérer les opérations liées au stockage de fichiers
 */
export const storageService = {
  /**
   * Télécharge un avatar dans le stockage local
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

      // Convertir l'image en base64 pour stockage local
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Stocker l'URL de l'image dans le localStorage
          const avatarUrl = reader.result as string;
          localStorage.setItem("user_avatar", avatarUrl);
          resolve({ url: avatarUrl, error: null });
        };
        reader.onerror = () => {
          resolve({ url: null, error: new Error("Erreur lors de la lecture du fichier") });
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
      localStorage.setItem("user_avatar", avatarUrl);
      return { success: true, error: null };
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'URL de l'avatar:", error);
      return { success: false, error: error instanceof Error ? error : new Error("Erreur inconnue") };
    }
  },

  /**
   * Récupère l'URL de l'avatar pour l'utilisateur actuel
   */
  getUserAvatar: (): string | null => {
    return localStorage.getItem("user_avatar");
  }
};
