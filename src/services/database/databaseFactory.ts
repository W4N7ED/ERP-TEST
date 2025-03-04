
import { DatabaseConfig, DatabaseService } from "./types";
import { toast } from "sonner";

// Cache singleton instance
let databaseInstance: DatabaseService | null = null;

export function createDatabaseService(config: DatabaseConfig): DatabaseService;
export function createDatabaseService(type: string): DatabaseService;
export function createDatabaseService(configOrType: DatabaseConfig | string): DatabaseService {
  try {
    if (typeof configOrType === 'string') {
      // Handle string type parameter (legacy support)
      throw new Error("Configuration insuffisante - veuillez fournir les paramètres complets de connexion");
    } else {
      // We need a real database implementation
      throw new Error("Méthode non implémentée - Veuillez configurer une base de données réelle");
    }
  } catch (error) {
    console.error("Erreur lors de la création du service de base de données:", error);
    toast.error("Erreur de connexion à la base de données");
    throw error;
  }
}

// Get the singleton instance of the database service
export function getDatabaseInstance(): DatabaseService {
  if (!databaseInstance) {
    throw new Error("Service de base de données non initialisé - Veuillez configurer une base de données réelle");
  }
  return databaseInstance;
}

// Set the singleton instance (used after successful connection)
export function setDatabaseInstance(instance: DatabaseService): void {
  databaseInstance = instance;
}
