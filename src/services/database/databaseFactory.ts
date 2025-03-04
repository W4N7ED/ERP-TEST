
import { MockDatabaseService } from "./MockDatabaseService";
import { MockOnlyDatabaseService, mockOnlyDbService } from "./MockOnlyDatabaseService";
import { DatabaseConfig, DatabaseService } from "./types";

export function createDatabaseService(config: DatabaseConfig): DatabaseService;
export function createDatabaseService(type: string): DatabaseService;
export function createDatabaseService(configOrType: DatabaseConfig | string): DatabaseService {
  // Version open-source : toujours retourner le MockOnlyDatabaseService
  if (typeof configOrType === 'string' && configOrType === 'mock') {
    return mockOnlyDbService;
  }
  
  if (typeof configOrType === 'object' && configOrType.type === 'mock') {
    return mockOnlyDbService;
  }
  
  // Pour les autres types, on renvoie quand même le mock pour la version open-source
  console.log('Note: Utilisation de la base de données simulée (version open-source)');
  return mockOnlyDbService;
}

// Get the singleton instance of the database service
export function getDatabaseInstance(): DatabaseService {
  return mockOnlyDbService;
}
