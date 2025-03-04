
import { DatabaseConfig, DatabaseService } from "./types";
import { MockDatabaseService } from "./MockDatabaseService";
import { MySQLDatabaseService } from "./MySQLDatabaseService";

// Factory to create database service based on configuration
export function createDatabaseService(config: DatabaseConfig): DatabaseService {
  switch (config.type) {
    case "mysql":
      return new MySQLDatabaseService(config);
    case "postgres":
    case "sqlite":
      // For now, all use the mock implementation
      // In a real app, you would implement specific database services
      return new MockDatabaseService(config);
    case "mock":
    default:
      return new MockDatabaseService(config);
  }
}

// Create and export a default database instance based on localStorage configuration
let dbInstance: DatabaseService | null = null;

export const getDatabaseInstance = (): DatabaseService => {
  if (!dbInstance) {
    // Try to get config from localStorage
    const savedConfig = localStorage.getItem("app_config");
    
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        dbInstance = createDatabaseService({
          host: config.host || "localhost",
          port: config.port || "3306",
          username: config.username || "",
          password: config.password || "",
          database: config.database || "",
          type: config.type || "mock"
        });
        
        // Connect to database
        dbInstance.connect().then(result => {
          if (!result.success) {
            console.warn("Failed to connect to database:", result.message);
          }
        });
      } catch (error) {
        console.error("Failed to create database instance:", error);
        // Fall back to mock database
        dbInstance = createDatabaseService({
          host: "localhost",
          port: "3306",
          username: "user",
          password: "password",
          database: "mockdb",
          type: "mock"
        });
      }
    } else {
      // No saved config, use mock database
      dbInstance = createDatabaseService({
        host: "localhost",
        port: "3306",
        username: "user",
        password: "password",
        database: "mockdb",
        type: "mock"
      });
    }
  }
  
  return dbInstance;
};
