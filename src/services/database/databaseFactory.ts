
import { DatabaseConfig, DatabaseService } from "./types";
import { toast } from "sonner";
import { SQLiteDatabaseService } from "./SQLiteDatabaseService";

// Cache de l'instance singleton
let databaseInstance: DatabaseService | null = null;

export function createDatabaseService(config: DatabaseConfig): DatabaseService;
export function createDatabaseService(type: string): DatabaseService;
export function createDatabaseService(configOrType: DatabaseConfig | string): DatabaseService {
  try {
    console.log("Création du service de base de données en mode navigateur");
    
    // Vérifier si nous sommes dans un environnement Windows
    const isWindows = typeof window !== 'undefined' && 
                     navigator.platform && 
                     (navigator.platform.indexOf('Win') > -1);
    
    // Toujours utiliser le mode localStorage pour le navigateur ou Windows sans modules natifs
    const defaultConfig: DatabaseConfig = {
      type: "sqlite",
      database: typeof configOrType === 'string' ? "app.db" : (configOrType.database || "app.db"),
      useLocalStorage: true // Forcer l'utilisation de localStorage
    };
    
    // Créer l'instance SQLite (qui utilise localStorage)
    const service = new SQLiteDatabaseService(defaultConfig);
    
    // Définir l'instance singleton
    setDatabaseInstance(service);
    
    return service;
  } catch (error) {
    console.error("Erreur lors de la création du service de base de données:", error);
    toast({
      variant: "destructive",
      title: "Erreur de connexion à la base de données",
      description: "Utilisation du stockage local comme solution de secours."
    });
    
    // Utiliser SQLite avec localStorage comme solution de secours en cas d'erreur
    const fallbackService = new SQLiteDatabaseService({ 
      type: "sqlite", 
      database: "fallback.db",
      useLocalStorage: true
    });
    setDatabaseInstance(fallbackService);
    return fallbackService;
  }
}

// Obtenir l'instance singleton du service de base de données
export function getDatabaseInstance(): DatabaseService {
  if (!databaseInstance) {
    // Créer une instance SQLite par défaut si aucune n'existe
    databaseInstance = new SQLiteDatabaseService({
      type: "sqlite",
      database: "app.db",
      useLocalStorage: true
    });
  }
  return databaseInstance;
}

// Définir l'instance singleton (utilisé après une connexion réussie)
export function setDatabaseInstance(instance: DatabaseService): void {
  databaseInstance = instance;
}
