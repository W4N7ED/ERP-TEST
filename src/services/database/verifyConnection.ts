
import { DatabaseConfig } from "./types";
import { createDatabaseService } from "./databaseFactory";

// Verification function for database connection
export const verifyDatabaseConnection = async (
  host: string,
  port: string,
  username: string,
  password: string,
  database: string,
  type: DatabaseConfig["type"] = "mysql",
  tablePrefix?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // For the simulated database, return immediate success
    if (type === "mock") {
      return {
        success: true,
        message: "Connection to simulated database established successfully"
      };
    }
    
    // In offline mode, simulate a successful connection for all database types
    if (type === "offline") {
      return {
        success: true,
        message: `Simulated connection to ${type} database at ${host}:${port}/${database}`
      };
    }
    
    // Use the database service for actual connection attempts
    const dbService = createDatabaseService({
      host,
      port,
      username,
      password,
      database,
      type,
      tablePrefix
    });
    
    return await dbService.connect();
  } catch (error) {
    console.error('Connection verification error:', error);
    return {
      success: false,
      message: `Verification error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};
