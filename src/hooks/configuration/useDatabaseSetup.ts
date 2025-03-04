
import { useCallback } from "react";
import { initDatabase } from "@/services/databaseService";
import { ConfigurationState, DatabaseInitResult } from "@/types/configuration";

export const useDatabaseSetup = (state: ConfigurationState, toast: any) => {
  const initializeDatabase = useCallback(async (): Promise<DatabaseInitResult> => {
    if (state.dbType === "mock") {
      return { 
        success: true, 
        message: "Base de données simulée configurée", 
        tables: ['users', 'inventory', 'suppliers', 'projects', 'interventions', 'movements', 'clients', 'quotes', 'quote_items']
      };
    }
    
    try {
      const result = await initDatabase(
        state.host, 
        state.port, 
        state.username, 
        state.password, 
        state.database,
        state.dbType as any,
        state.tablePrefix
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
        toast({
          title: "Initialisation réussie",
          description: `${result.tables.length} tables créées avec succès`,
        });
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
      toast({
        variant: "destructive",
        title: "Erreur d'initialisation",
        description: `Erreur d'initialisation: ${errorMessage}`,
      });
      
      return {
        success: false,
        message: `Erreur d'initialisation: ${errorMessage}`
      };
    }
  }, [state, toast]);

  return { initializeDatabase };
};
