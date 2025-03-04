
import { MockDatabaseService } from "./MockDatabaseService";
import { MySQLDatabaseService } from "./MySQLDatabaseService";
import { DatabaseConfig, DatabaseService } from "./types";
import { mockOnlyDbService } from "./MockOnlyDatabaseService";

export function createDatabaseService(config: DatabaseConfig): DatabaseService;
export function createDatabaseService(type: string): DatabaseService;
export function createDatabaseService(configOrType: DatabaseConfig | string): DatabaseService {
  // Always return the MockOnlyDatabaseService for the open-source version
  return mockOnlyDbService;
}

// Get the singleton instance of the database service
export function getDatabaseInstance(): DatabaseService {
  return mockOnlyDbService;
}
