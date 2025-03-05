import { useState } from "react";
import { storageService } from "@/services/storageService";
import { useTestConnection } from "@/hooks/database/useTestConnection";
import { useInitializeDatabase } from "@/hooks/database/useInitializeDatabase";

export const useDatabaseConnection = (
  host: string,
  port: string,
  username: string,
  password: string,
  database: string,
  dbType: string,
  tablePrefix: string
) => {
  const { 
    connectionResult, 
    isTestingConnection, 
    testConnection 
  } = useTestConnection();
  
  const { 
    initResult, 
    isInitializingDatabase, 
    initializeDatabase 
  } = useInitializeDatabase();

  const isLoading = {
    testing: isTestingConnection,
    initializing: isInitializingDatabase
  };

  const handleTestConnection = async () => {
    await testConnection(host, port, username, password, database, dbType);
    
    if (connectionResult?.success) {
      // Sauvegarder la configuration de la base de données
      storageService.saveData("db_config", {
        host,
        port,
        username,
        password,
        database,
        dbType,
        tablePrefix,
        usingDirect: connectionResult.usingDirect || false
      });
    }
  };

  const handleInitializeDatabase = async () => {
    await initializeDatabase(host, port, username, password, database, dbType, tablePrefix);
  };

  return {
    connectionResult,
    initResult,
    isLoading,
    testConnection: handleTestConnection,
    initializeDatabase: handleInitializeDatabase
  };
};
