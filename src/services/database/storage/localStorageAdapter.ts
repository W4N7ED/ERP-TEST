
import { toast } from "sonner";

/**
 * Adapter pour les opérations de stockage local
 */
export const localStorageAdapter = {
  /**
   * Récupère des données depuis localStorage
   * @param key Clé de stockage
   * @returns Données désérialisées ou null
   */
  getData<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) as T : null;
    } catch (error) {
      console.error(`Erreur lors de la récupération des données '${key}':`, error);
      return null;
    }
  },

  /**
   * Sauvegarde des données dans localStorage
   * @param key Clé de stockage
   * @param data Données à sauvegarder
   * @returns Succès de l'opération
   */
  saveData<T>(key: string, data: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Erreur lors de la sauvegarde des données '${key}':`, error);
      toast.error("Erreur lors de la sauvegarde des données");
      return false;
    }
  },

  /**
   * Supprime des données du localStorage
   * @param key Clé de stockage
   */
  removeData(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Erreur lors de la suppression des données '${key}':`, error);
    }
  }
};
