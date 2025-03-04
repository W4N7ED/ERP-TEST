
import { useCallback } from "react";
import { initDatabase } from "@/services/databaseService";
import { ConfigurationState, DatabaseInitResult } from "@/types/configuration";

export const useDatabaseSetup = (state: ConfigurationState, toast: any) => {
  const initializeDatabase = useCallback(async (): Promise<DatabaseInitResult> => {
    if (state.dbType === "mock") {
      return { 
        success: true, 
        message: "Base de données simulée configurée", 
        tables: ['users', 'inventory', 'suppliers', 'projects', 'interventions', 'movements', 'clients', 'quotes']
      };
    }
    
    try {
      const result = await initDatabase(
        state.host, 
        state.port, 
        state.username, 
        state.password, 
        state.database,
        state.dbType as any
      );
      
      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Erreur d'initialisation",
          description: result.message,
        });
        return result;
      }
      
      if (result.tables && result.tables.length > 0) {
        console.log("Tables créées:", result.tables);
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
      return {
        success: false,
        message: `Erreur d'initialisation: ${errorMessage}`
      };
    }
  }, [state, toast]);

  return { initializeDatabase };
};
