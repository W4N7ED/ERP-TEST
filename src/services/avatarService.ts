
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

/**
 * Service pour gérer les opérations liées aux avatars
 */
export const avatarService = {
  /**
   * Télécharge un avatar dans le bucket Supabase
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

      // Créer un nom de fichier unique
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Télécharger le fichier
      const { error: uploadError, data } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false
        });

      if (uploadError) {
        console.error("Erreur lors du téléchargement de l'avatar:", uploadError);
        return { url: null, error: uploadError };
      }

      // Récupérer l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      return { url: publicUrl, error: null };
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'avatar:", error);
      return { url: null, error: error instanceof Error ? error : new Error("Erreur inconnue") };
    }
  },

  /**
   * Met à jour l'URL de l'avatar dans le profil utilisateur
   */
  updateUserAvatarUrl: async (avatarUrl: string): Promise<{ success: boolean; error: Error | null }> => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", supabase.auth.getUser()?.data?.user?.id);

      if (error) {
        console.error("Erreur lors de la mise à jour de l'URL de l'avatar:", error);
        return { success: false, error };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'URL de l'avatar:", error);
      return { success: false, error: error instanceof Error ? error : new Error("Erreur inconnue") };
    }
  }
};
