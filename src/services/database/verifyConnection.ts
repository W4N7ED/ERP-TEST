
import { DatabaseConfig } from "./types";
import { ConnectionResult, getConnectionAdapter } from "../../hooks/database/adapters/connectionAdapters";

// Fonction principale pour vérifier la connexion à la base de données
export const verifyDatabaseConnection = async (
  host: string,
  port: string,
  username: string,
  password: string,
  database: string,
  type: DatabaseConfig["type"] = "mysql",
  tablePrefix: string = ""
): Promise<ConnectionResult> => {
  try {
    console.log(`Vérification de la connexion à ${type}:${host}:${port}/${database}`);
    
    // Vérifier si nous avons une configuration existante qui désactive le mock
    const dbConfig = localStorage.getItem("db_config");
    let mockDisabled = false;
    
    if (dbConfig) {
      try {
        const config = JSON.parse(dbConfig);
        mockDisabled = config.mockDisabled === true;
      } catch (err) {
        console.error("Erreur lors de la lecture de la configuration DB:", err);
      }
    }
    
    // Utiliser l'adaptateur approprié pour le type de base de données
    const connectionAdapter = getConnectionAdapter(type);
    
    // Paramètres de connexion
    const params = {
      host,
      port,
      username,
      password,
      database
    };
    
    // Tester la connexion
    const result = await connectionAdapter(params);
    
    // Si la connexion est réussie, désactiver le mode mock dans la configuration
    if (result.success) {
      const currentConfig = dbConfig ? JSON.parse(dbConfig) : {};
      localStorage.setItem("db_config", JSON.stringify({
        ...currentConfig,
        mockDisabled: true
      }));
    }
    
    return result;
  } catch (error) {
    console.error('Erreur lors de la vérification de la connexion:', error);
    return {
      success: false,
      message: `Erreur de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
};

// Fonction pour vérifier les connexions externes (API)
export const verifyExternalConnection = async (params: any) => {
  try {
    // Vérifier si le mode mock est désactivé
    const dbConfig = localStorage.getItem("db_config");
    let mockDisabled = false;
    
    if (dbConfig) {
      try {
        const config = JSON.parse(dbConfig);
        mockDisabled = config.mockDisabled === true;
      } catch (err) {
        console.error("Erreur lors de la lecture de la configuration DB:", err);
      }
    }
    
    // Si le mode mock est désactivé, utiliser une vraie connexion API
    if (mockDisabled) {
      console.log("Utilisation d'une connexion API réelle (mode mock désactivé)");
    }
    
    // Construire l'URL complète pour éviter les problèmes CORS
    let proxyUrl = '/lovable-proxy';
    // S'assurer que l'URL est correcte si on est dans un environnement de développement
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      proxyUrl = `${window.location.protocol}//${window.location.host}${proxyUrl}`;
    }
    
    // Utiliser un proxy pour éviter les problèmes CORS
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin,
      },
      body: JSON.stringify({
        ...params,
        useDirect: mockDisabled // Indiquer si nous souhaitons une connexion directe
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur de vérification de connexion externe:", error);
    throw error;
  }
};
