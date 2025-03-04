
import { verifyDatabaseConnection } from "./database/verifyConnection";
import { initDatabase } from "./database/initDatabase";
import { createDatabaseService, getDatabaseInstance } from "./database/databaseFactory";
import { DatabaseConfig } from "./database/types";

// Re-export everything for backward compatibility
export { 
  verifyDatabaseConnection,
  initDatabase,
  createDatabaseService,
  getDatabaseInstance
};
export type { DatabaseConfig };
