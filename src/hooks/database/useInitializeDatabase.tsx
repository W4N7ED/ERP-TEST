
import { useState } from "react";
import { toast } from "sonner";
import { storageService } from "@/services/storageService";
import { supabase } from "@/integrations/supabase/client";

interface InitResult {
  success: boolean;
  message: string;
  tables?: string[];
}

export const useInitializeDatabase = () => {
  const [initResult, setInitResult] = useState<InitResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const initializeDatabase = async (
    host: string,
    port: string,
    username: string,
    password: string,
    database: string,
    dbType: string,
    tablePrefix: string
  ) => {
    setInitResult(null);
    setIsLoading(true);

    toast("Initialisation en cours: Création des tables dans la base de données...");

    try {
      let result;
      
      if (dbType === "postgres") {
        // Pour PostgreSQL, utiliser la fonction Edge pour initialiser directement
        try {
          console.log("Tentative d'initialisation directe de PostgreSQL");
          const { data, error } = await supabase.functions.invoke('init-database', {
            body: {
              host,
              port,
              username,
              password,
              database,
              type: dbType,
              tablePrefix
            },
          });
          
          if (error) {
            result = {
              success: false,
              message: `Erreur d'initialisation PostgreSQL: ${error.message}`
            };
          } else {
            result = data;
          }
          
          console.log("Résultat initialisation PostgreSQL:", result);
        } catch (postgresError) {
          result = {
            success: false,
            message: `Erreur lors de l'initialisation PostgreSQL: ${postgresError instanceof Error ? postgresError.message : 'Erreur inconnue'}`
          };
        }
      } else {
        // Initialisation des données par défaut (SQLite/localStorage)
        if (!storageService.getData(database || "app_db")) {
          // Initialiser des tableaux vides pour les projets et interventions
          storageService.saveData(database || "app_db", {
            projects: [],
            interventions: [],
            inventory: [],
            suppliers: [],
            quotes: [],
            clients: [],
            users: [],
            employees: []
          });
        }
        
        const tables = [
          "projects", "interventions", "inventory", "suppliers", 
          "quotes", "clients", "users", "employees", "leave_requests", 
          "contracts", "schedules", "performance_reviews"
        ];
        
        result = {
          success: true,
          message: "Tables initialisées avec succès dans localStorage",
          tables: tables.map(t => `${tablePrefix || ""}${t}`)
        };
      }
      
      setInitResult(result);
      
      if (result.success) {
        toast.success("Initialisation réussie: Les tables ont été créées avec succès");
      } else {
        toast.error("Échec d'initialisation: " + result.message);
      }
    } catch (error) {
      console.error("Error initializing database:", error);
      setInitResult({
        success: false,
        message: `Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
      });
      
      toast.error(`Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initResult,
    isInitializingDatabase: isLoading,
    initializeDatabase
  };
};
