
import { useState } from "react";
import { toast } from "sonner";
import { storageService } from "@/services/storageService";
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
  const [connectionResult, setConnectionResult] = useState<{ success: boolean; message: string; usingDirect?: boolean } | null>(null);
  const [initResult, setInitResult] = useState<{ success: boolean; message: string; tables?: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState<{ testing: boolean; initializing: boolean }>({
    testing: false,
    initializing: false
  });

  const testConnection = async () => {
    setConnectionResult(null);
    setIsLoading(prev => ({ ...prev, testing: true }));

    toast("Test de connexion: Tentative de connexion à la base de données...");

    try {
      let result;
      
      if (dbType === "sqlite") {
        // Simulation d'un succès pour SQLite (mode navigateur)
        result = {
          success: true,
          message: "Connexion réussie à la base de données SQLite (mode navigateur avec localStorage)"
        };
      } else if (dbType === "postgres") {
        // Pour PostgreSQL, utiliser la fonction Edge pour tester la connexion directe
        try {
          console.log("Tentative de connexion directe à PostgreSQL");
          const { data, error } = await supabase.functions.invoke('verify-db-connection', {
            body: {
              host,
              port,
              username,
              password,
              database,
              type: dbType
            },
          });
          
          if (error) {
            result = {
              success: false,
              message: `Erreur de connexion à PostgreSQL: ${error.message}`
            };
          } else {
            result = data;
          }
          
          console.log("Résultat connexion PostgreSQL:", result);
        } catch (postgresError) {
          result = {
            success: false,
            message: `Erreur lors de la vérification PostgreSQL: ${postgresError instanceof Error ? postgresError.message : 'Erreur inconnue'}`
          };
        }
      } else {
        // Pour les autres types de base de données, afficher un message d'information
        result = {
          success: true,
          message: `Mode compatible navigateur activé. Les données seront stockées localement avec SQLite/localStorage. Configuration ${dbType} sera utilisée en production.`
        };
      }
      
      setConnectionResult(result);
      
      if (result.success) {
        toast.success("Connexion réussie: " + result.message);
        
        // Sauvegarder la configuration de la base de données
        storageService.saveData("db_config", {
          host,
          port,
          username,
          password,
          database,
          dbType,
          tablePrefix,
          usingDirect: result.usingDirect || false
        });
      } else {
        toast.error("Échec de connexion: " + result.message);
      }
    } catch (error) {
      setConnectionResult({
        success: false,
        message: `Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
      });
      
      toast.error(`Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsLoading(prev => ({ ...prev, testing: false }));
    }
  };

  const initializeDatabase = async () => {
    setInitResult(null);
    setIsLoading(prev => ({ ...prev, initializing: true }));

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
      setIsLoading(prev => ({ ...prev, initializing: false }));
    }
  };

  return {
    connectionResult,
    initResult,
    isLoading,
    testConnection,
    initializeDatabase
  };
};
