import { supabase } from "@/integrations/supabase/client";

export interface ConnectionResult {
  success: boolean;
  message: string;
  usingDirect?: boolean;
}

// Base interface for connection parameters
export interface ConnectionParams {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
}

// SQLite adapter - simulates a successful connection for browser mode
export const sqliteAdapter = async (): Promise<ConnectionResult> => {
  return {
    success: true,
    message: "Connexion réussie à la base de données SQLite (mode navigateur avec localStorage)"
  };
};

// PostgreSQL adapter - uses the Edge Function to test the connection
export const postgresAdapter = async (params: ConnectionParams): Promise<ConnectionResult> => {
  try {
    console.log("Tentative de connexion directe à PostgreSQL");
    
    const { data, error } = await supabase.functions.invoke('verify-db-connection', {
      body: {
        host: params.host,
        port: params.port,
        username: params.username,
        password: params.password,
        database: params.database,
        type: "postgres"
      },
    });
    
    if (error) {
      return {
        success: false,
        message: `Erreur de connexion à PostgreSQL: ${error.message}`
      };
    }
    
    return data as ConnectionResult;
  } catch (error) {
    return {
      success: false,
      message: `Erreur lors de la vérification PostgreSQL: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
};

// Generic adapter for database types that run in browser-compatibility mode
export const browserCompatAdapter = async (dbType: string): Promise<ConnectionResult> => {
  return {
    success: true,
    message: `Mode compatible navigateur activé. Les données seront stockées localement avec SQLite/localStorage. Configuration ${dbType} sera utilisée en production.`
  };
};

// Factory function to get the appropriate adapter based on database type
export const getConnectionAdapter = (dbType: string) => {
  switch (dbType) {
    case "sqlite":
      return sqliteAdapter;
    case "postgres":
      return postgresAdapter;
    default:
      return (params: ConnectionParams) => browserCompatAdapter(dbType);
  }
};

// Update any API calls to Lovable to use our proxy
export const verifyExternalConnection = async (params: ConnectionParams) => {
  try {
    // Use the Supabase Edge Function as a proxy
    const { data, error } = await supabase.functions.invoke('lovable-proxy', {
      body: params,
    });
    
    if (error) {
      throw new Error(`Error: ${error.message}`);
    }
    
    return data;
  } catch (error) {
    console.error("Connection verification error:", error);
    throw error;
  }
};
