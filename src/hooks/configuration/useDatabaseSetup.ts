
import { DatabaseConfig } from "@/services/database/types";
import { createDatabaseService } from "@/services/database/databaseFactory";
import { storageService } from "@/services/storageService";
import { ConfigurationState, DatabaseInitResult } from "@/types/configuration";
import { initDatabase } from "@/services/database/initDatabase";

export const useDatabaseSetup = (state: ConfigurationState, toast: any) => {
  const initializeDatabase = async (): Promise<DatabaseInitResult> => {
    try {
      console.log("Initializing database with:", state.host, state.port, state.dbType);
      
      // Create database configuration
      const config: DatabaseConfig = {
        type: state.dbType as any,
        host: state.host,
        port: Number(state.port),
        username: state.username,
        password: state.password,
        database: state.database,
        tablePrefix: state.tablePrefix,
      };
      
      // First verify and initialize the database
      const initResult = await initDatabase(
        state.host,
        state.port,
        state.username,
        state.password,
        state.database,
        state.dbType as any,
        state.tablePrefix
      );

      if (!initResult.success) {
        return initResult;
      }

      // Create and connect to the database service
      const databaseService = createDatabaseService(config);
      const connectionResult = await databaseService.connect();
      
      if (!connectionResult.success) {
        return {
          success: false,
          message: connectionResult.message
        };
      }
      
      // Save database configuration to storage
      const currentConfig = storageService.getAppConfiguration() || {};
      storageService.saveAppConfiguration({
        ...currentConfig,
        database: {
          host: state.host,
          port: state.port,
          username: state.username,
          password: state.password,
          database: state.database,
          type: state.dbType,
          tablePrefix: state.tablePrefix,
        }
      });
      
      return initResult;
    } catch (error) {
      console.error("Error initializing database:", error);
      return {
        success: false,
        message: `Database initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  };

  return { initializeDatabase };
};
