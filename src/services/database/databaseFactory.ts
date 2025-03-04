
import { DatabaseConfig, DatabaseService } from "./types";
import { toast } from "sonner";
import { MySQLDatabaseService } from "./MySQLDatabaseService";
import { PostgreSQLDatabaseService } from "./PostgreSQLDatabaseService";
import { SQLiteDatabaseService } from "./SQLiteDatabaseService";

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
      // We create an actual database service based on the type
      const service = (() => {
        switch (configOrType.type) {
          case "mysql":
            return new MySQLDatabaseService(configOrType);
          case "postgres":
            return new PostgreSQLDatabaseService(configOrType);
          case "sqlite":
            return new SQLiteDatabaseService(configOrType);
          default:
            throw new Error(`Unsupported database type: ${configOrType.type}`);
        }
      })();

      // Set the singleton instance after creation
      setDatabaseInstance(service);
      return service;
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
    throw new Error("Service de base de données non initialisé - Veuillez configurer une base de données");
  }
  return databaseInstance;
}

// Set the singleton instance (used after successful connection)
export function setDatabaseInstance(instance: DatabaseService): void {
  databaseInstance = instance;
}
