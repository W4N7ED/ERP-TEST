
import { DatabaseConfig, DatabaseService } from "./types";
import { toast } from "sonner";
import { MySQLDatabaseService } from "./MySQLDatabaseService";
import { PostgreSQLDatabaseService } from "./PostgreSQLDatabaseService";
import { SQLiteDatabaseService } from "./SQLiteDatabaseService";

// Cache de l'instance singleton
let databaseInstance: DatabaseService | null = null;

export function createDatabaseService(config: DatabaseConfig): DatabaseService;
export function createDatabaseService(type: string): DatabaseService;
export function createDatabaseService(configOrType: DatabaseConfig | string): DatabaseService {
  try {
    if (typeof configOrType === 'string') {
      // Gérer le paramètre de type string (support hérité)
      throw new Error("Configuration insuffisante - veuillez fournir les paramètres complets de connexion");
    } else {
      // Par défaut, utilisez SQLite pour éviter les problèmes de compilation native
      let service: DatabaseService;
      
      // En cas de problème avec MySQL ou PostgreSQL, nous pouvons toujours revenir à SQLite
      try {
        switch (configOrType.type) {
          case "mysql":
            service = new MySQLDatabaseService(configOrType);
            break;
          case "postgres":
            service = new PostgreSQLDatabaseService(configOrType);
            break;
          default:
            // Utiliser SQLite comme option de secours
            service = new SQLiteDatabaseService(configOrType);
        }
      } catch (error) {
        console.warn(`Erreur lors de la création du service de base de données ${configOrType.type}, utilisation de SQLite comme solution de secours`, error);
        service = new SQLiteDatabaseService(configOrType);
      }

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
