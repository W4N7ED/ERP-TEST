
import { DatabaseConfig, DatabaseService } from "./types";
import { toast } from "sonner";
import { SQLiteDatabaseService } from "./SQLiteDatabaseService";

// Cache de l'instance singleton
let databaseInstance: DatabaseService | null = null;

export function createDatabaseService(config: DatabaseConfig): DatabaseService;
export function createDatabaseService(type: string): DatabaseService;
export function createDatabaseService(configOrType: DatabaseConfig | string): DatabaseService {
  try {
    if (typeof configOrType === 'string') {
      // Gérer le paramètre de type string (support hérité)
      console.warn("Configuration simplifiée utilisée - on utilise SQLite par défaut");
      const defaultConfig: DatabaseConfig = {
        type: "sqlite",
        database: "app.db"
      };
      const service = new SQLiteDatabaseService(defaultConfig);
      setDatabaseInstance(service);
      return service;
    } else {
      // Utiliser SQLite pour le développement web
      console.log("Création du service de base de données avec la configuration:", configOrType);
      
      // Toujours utiliser SQLite pour éviter les problèmes de compilation native
      const service = new SQLiteDatabaseService(configOrType);
      
      // Définir l'instance singleton après création
      setDatabaseInstance(service);
      return service;
    }
  } catch (error) {
    console.error("Erreur lors de la création du service de base de données:", error);
    toast.error("Erreur de connexion à la base de données");
    
    // Utiliser SQLite comme solution de secours en cas d'erreur
    const fallbackService = new SQLiteDatabaseService({ 
      type: "sqlite", 
      database: "fallback.db"
    });
    setDatabaseInstance(fallbackService);
    return fallbackService;
  }
}

// Obtenir l'instance singleton du service de base de données
export function getDatabaseInstance(): DatabaseService {
  if (!databaseInstance) {
    // Créer une instance SQLite par défaut si aucune n'existe
    const defaultConfig: DatabaseConfig = {
      type: "sqlite",
      database: "app.db"
    };
    databaseInstance = new SQLiteDatabaseService(defaultConfig);
  }
  return databaseInstance;
}

// Définir l'instance singleton (utilisé après une connexion réussie)
export function setDatabaseInstance(instance: DatabaseService): void {
  databaseInstance = instance;
}
