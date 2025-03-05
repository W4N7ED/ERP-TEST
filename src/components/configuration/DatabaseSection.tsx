
import { useState } from "react";
import { DatabaseTypeSelector } from "./database/DatabaseTypeSelector";
import { ConnectionFields } from "./database/ConnectionFields";
import { ConnectionActions } from "./database/ConnectionActions";
import { useDatabaseConnection } from "./database/useDatabaseConnection";

interface DatabaseSectionProps {
  host: string;
  setHost: (value: string) => void;
  port: string;
  setPort: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  database: string;
  setDatabase: (value: string) => void;
  dbType: string;
  setDbType: (value: string) => void;
  tablePrefix: string;
  setTablePrefix: (value: string) => void;
}

export const DatabaseSection = ({
  host,
  setHost,
  port,
  setPort,
  username,
  setUsername,
  password,
  setPassword,
  database,
  setDatabase,
  dbType,
  setDbType,
  tablePrefix,
  setTablePrefix
}: DatabaseSectionProps) => {
  const {
    connectionResult,
    initResult,
    isLoading,
    testConnection,
    initializeDatabase
  } = useDatabaseConnection(
    host,
    port,
    username,
    password,
    database,
    dbType,
    tablePrefix
  );

  // Mise à jour du port par défaut lorsque le type de base de données change
  const handleDbTypeChange = (value: string) => {
    setDbType(value);
    
    // Définir le port par défaut en fonction du type de base de données
    if (value === "mysql" && (!port || port === "5432")) {
      setPort("3306");
    } else if (value === "postgres" && (!port || port === "3306")) {
      setPort("5432");
    }
    
    // Définir les valeurs par défaut pour PostgreSQL
    if (value === "postgres" && (!username || username === "root")) {
      setUsername("postgres");
    }
    
    // Valeurs par défaut pour MySQL
    if (value === "mysql" && username === "postgres") {
      setUsername("root");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Connexion à la base de données</h3>
      
      <DatabaseTypeSelector 
        dbType={dbType} 
        onChange={handleDbTypeChange} 
      />
      
      <ConnectionFields
        host={host}
        setHost={setHost}
        port={port}
        setPort={setPort}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        database={database}
        setDatabase={setDatabase}
        tablePrefix={tablePrefix}
        setTablePrefix={setTablePrefix}
        disabled={false}
      />
      
      <ConnectionActions
        dbType={dbType}
        host={host}
        port={port}
        username={username}
        password={password}
        database={database}
        tablePrefix={tablePrefix}
        connectionResult={connectionResult}
        initResult={initResult}
        isLoading={isLoading}
        onTestConnection={testConnection}
        onInitializeDatabase={initializeDatabase}
      />
    </div>
  );
};
