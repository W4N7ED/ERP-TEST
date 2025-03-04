
import { DatabaseConfig, DatabaseService } from "./types";

export function createDatabaseService(config: DatabaseConfig): DatabaseService;
export function createDatabaseService(type: string): DatabaseService;
export function createDatabaseService(configOrType: DatabaseConfig | string): DatabaseService {
  throw new Error("Méthode non implémentée - Veuillez configurer une base de données réelle");
}

// Get the singleton instance of the database service
export function getDatabaseInstance(): DatabaseService {
  throw new Error("Méthode non implémentée - Veuillez configurer une base de données réelle");
}
