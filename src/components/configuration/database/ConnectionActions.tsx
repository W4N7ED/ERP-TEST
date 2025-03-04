
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Database } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ConnectionActionsProps {
  dbType: string;
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  tablePrefix: string;
  onTestConnection: () => Promise<void>;
  onInitializeDatabase: () => Promise<void>;
  connectionResult: { success: boolean; message: string } | null;
  initResult: { success: boolean; message: string; tables?: string[] } | null;
  isLoading?: { testing: boolean; initializing: boolean };
}

export const ConnectionActions = ({
  dbType,
  host,
  port,
  username,
  database,
  onTestConnection,
  onInitializeDatabase,
  connectionResult,
  initResult,
  isLoading = { testing: false, initializing: false }
}: ConnectionActionsProps) => {
  const handleTestConnection = async () => {
    await onTestConnection();
  };

  const handleInitializeDatabase = async () => {
    await onInitializeDatabase();
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleTestConnection}
          className="flex items-center gap-2"
          disabled={isLoading.testing || !host || !port || !username || !database}
        >
          {isLoading.testing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
          {isLoading.testing ? "Test en cours..." : "Tester la connexion"}
        </Button>
        
        <Button 
          type="button" 
          onClick={handleInitializeDatabase}
          className="flex items-center gap-2"
          disabled={isLoading.initializing || !connectionResult?.success}
        >
          {isLoading.initializing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isLoading.initializing ? "Initialisation en cours..." : "Initialiser les tables"}
        </Button>
      </div>
      
      {connectionResult && (
        <Alert variant={connectionResult.success ? "default" : "destructive"} className="mt-3">
          <AlertTitle>{connectionResult.success ? "Connexion réussie" : "Échec de connexion"}</AlertTitle>
          <AlertDescription>{connectionResult.message}</AlertDescription>
        </Alert>
      )}
      
      {initResult && (
        <Alert variant={initResult.success ? "default" : "destructive"} className="mt-3">
          <AlertTitle>{initResult.success ? "Initialisation réussie" : "Échec de l'initialisation"}</AlertTitle>
          <AlertDescription>
            {initResult.message}
            {initResult.success && initResult.tables && (
              <div className="mt-2">
                <p className="font-medium">Tables créées:</p>
                <ul className="list-disc list-inside mt-1">
                  {initResult.tables.map((table, index) => (
                    <li key={index} className="text-sm">
                      <span className="font-mono">{table}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
