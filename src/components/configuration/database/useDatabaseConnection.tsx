
import { useState } from "react";
import { storageService } from "@/services/storageService";
import { useTestConnection } from "@/hooks/database/useTestConnection";
import { useInitializeDatabase } from "@/hooks/database/useInitializeDatabase";
import { supabase } from "@/integrations/supabase/client";

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
      // Désactiver le mode mock si la connexion est réussie
      if (supabase.isMockMode) {
        supabase.disableMockMode();
      }
      
      // Sauvegarder la configuration de la base de données
      storageService.saveData("db_config", {
        host,
        port,
        username,
        password,
        database,
        dbType,
        tablePrefix,
        usingDirect: connectionResult.usingDirect || false,
        mockDisabled: true // Indiquer que le mock est désactivé
      });
    }
  };

  const handleInitializeDatabase = async () => {
    await initializeDatabase(host, port, username, password, database, dbType, tablePrefix);
    
    // Après une initialisation réussie, s'assurer que le mode mock est désactivé
    if (initResult?.success && supabase.isMockMode) {
      supabase.disableMockMode();
      
      // Mettre à jour la configuration pour indiquer que le mock est désactivé
      const dbConfig = storageService.getData("db_config") || {};
      storageService.saveData("db_config", {
        ...dbConfig,
        mockDisabled: true
      });
    }
  };

  return {
    connectionResult,
    initResult,
    isLoading,
    testConnection: handleTestConnection,
    initializeDatabase: handleInitializeDatabase
  };
};
