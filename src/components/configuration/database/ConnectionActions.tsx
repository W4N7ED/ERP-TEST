
import { useState } from "react";
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
  initResult
}: ConnectionActionsProps) => {
  const [isTesting, setIsTesting] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const handleTestConnection = async () => {
    setIsTesting(true);
    await onTestConnection();
    setIsTesting(false);
  };

  const handleInitializeDatabase = async () => {
    setIsInitializing(true);
    await onInitializeDatabase();
    setIsInitializing(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleTestConnection}
          className="flex items-center gap-2"
          disabled={isTesting || !host || !port || !username || !database}
        >
          {isTesting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
          {isTesting ? "Test en cours..." : "Tester la connexion"}
        </Button>
        
        <Button 
          type="button" 
          onClick={handleInitializeDatabase}
          className="flex items-center gap-2"
          disabled={isInitializing || !connectionResult?.success}
        >
          {isInitializing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isInitializing ? "Initialisation en cours..." : "Initialiser les tables"}
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
