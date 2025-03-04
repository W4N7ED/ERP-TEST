
import { MockDatabaseService } from "./MockDatabaseService";
import { MySQLDatabaseService } from "./MySQLDatabaseService";
import { DatabaseService } from "./types";
import { mockOnlyDbService, MockOnlyDatabaseService } from "./MockOnlyDatabaseService";

export function createDatabaseService(type: string): DatabaseService {
  // Always return the MockOnlyDatabaseService for the open-source version
  return mockOnlyDbService as any;
}
