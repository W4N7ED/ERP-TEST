
import { DatabaseConfig, DatabaseService } from "./types";
import { toast } from "sonner";
import { SQLiteDatabaseService } from "./SQLiteDatabaseService";

// Cache de l'instance singleton
let databaseInstance: DatabaseService | null = null;

// Vérifier si on est dans un environnement navigateur
const isBrowser = typeof window !== 'undefined';

export function createDatabaseService(config: DatabaseConfig): DatabaseService;
export function createDatabaseService(type: string): DatabaseService;
export function createDatabaseService(configOrType: DatabaseConfig | string): DatabaseService {
  try {
    // En mode navigateur, toujours utiliser SQLite avec localStorage
    if (isBrowser) {
      console.log("Création du service de base de données en mode navigateur");
      // Toujours utiliser SQLite/localStorage pour le navigateur
      const defaultConfig: DatabaseConfig = {
        type: "sqlite",
        database: typeof configOrType === 'string' ? "app.db" : (configOrType.database || "app.db")
      };
      
      // Créer l'instance SQLite (qui utilise localStorage)
      const service = new SQLiteDatabaseService(defaultConfig);
      
      // Définir l'instance singleton
      setDatabaseInstance(service);
      
      return service;
    }
    
    // En mode serveur, on pourrait essayer d'utiliser la vraie implémentation
    // Mais pour maintenant, on va toujours utiliser SQLite pour simplicité
    console.log("Création du service de base de données en mode serveur");
    const sqliteService = new SQLiteDatabaseService({
      type: "sqlite",
      database: typeof configOrType === 'string' ? "app.db" : (configOrType.database || "app.db")
    });
    
    setDatabaseInstance(sqliteService);
    return sqliteService;
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
    databaseInstance = new SQLiteDatabaseService({
      type: "sqlite",
      database: "app.db"
    });
  }
  return databaseInstance;
}

// Définir l'instance singleton (utilisé après une connexion réussie)
export function setDatabaseInstance(instance: DatabaseService): void {
  databaseInstance = instance;
}
