
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { verifyDatabaseConnection } from "@/services/databaseService";
import { initDatabase } from "@/services/databaseService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Check, Database, Loader2 } from "lucide-react";

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
  const [isTesting, setIsTesting] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [connectionResult, setConnectionResult] = useState<{ success: boolean; message: string } | null>(null);
  const [initResult, setInitResult] = useState<{ success: boolean; message: string; tables?: string[] } | null>(null);
  const { toast } = useToast();

  // Mise à jour du port par défaut lorsque le type de base de données change
  const handleDbTypeChange = (value: string) => {
    setDbType(value);
    
    // Définir le port par défaut en fonction du type de base de données
    if (value === "mysql" && (!port || port === "5432")) {
      setPort("3306");
    } else if (value === "postgres" && (!port || port === "3306")) {
      setPort("5432");
    } else if (value === "mock") {
      // Pour la simulation, ces valeurs ne sont pas importantes
      setHost('localhost');
      setPort('');
      setUsername('');
      setPassword('');
      setDatabase('mock');
    }
  };

  const validateInputs = () => {
    if (dbType === "mock") return true;
    
    if (!host || !port || !username || !database) {
      toast({
        variant: "destructive",
        title: "Champs incomplets",
        description: "Veuillez remplir tous les champs obligatoires (hôte, port, nom d'utilisateur, base de données)",
      });
      return false;
    }
    return true;
  };

  const testConnection = async () => {
    if (!validateInputs()) return;

    // Set testing state to true
    setIsTesting(true);
    setConnectionResult(null);

    toast({
      title: "Test de connexion",
      description: "Tentative de connexion à la base de données...",
    });

    try {
      // Use the verification service
      const result = await verifyDatabaseConnection(
        host, 
        port, 
        username, 
        password, 
        database, 
        dbType as any
      );
      
      setConnectionResult(result);
      
      if (result.success) {
        toast({
          title: "Connexion réussie",
          description: result.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Échec de connexion",
          description: result.message,
        });
      }
    } catch (error) {
      setConnectionResult({
        success: false,
        message: `Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
      });
      
      toast({
        variant: "destructive",
        title: "Erreur",
        description: `Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const initializeDatabase = async () => {
    if (!validateInputs()) return;
    
    if (dbType !== "mock" && !connectionResult?.success) {
      toast({
        title: "Test requis",
        description: "Veuillez d'abord tester la connexion à la base de données avec succès",
      });
      return;
    }

    setIsInitializing(true);
    setInitResult(null);

    toast({
      title: "Initialisation en cours",
      description: "Création des tables dans la base de données...",
    });

    try {
      // Initialize the database
      const result = await initDatabase(
        host, 
        port, 
        username, 
        password, 
        database, 
        dbType as any,
        tablePrefix
      );
      
      setInitResult(result);
      
      if (result.success) {
        toast({
          title: "Initialisation réussie",
          description: "Les tables ont été créées avec succès",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Échec de l'initialisation",
          description: result.message,
        });
      }
    } catch (error) {
      setInitResult({
        success: false,
        message: `Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
      });
      
      toast({
        variant: "destructive",
        title: "Erreur",
        description: `Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      });
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Connexion à la base de données</h3>
      
      <div className="space-y-2">
        <Label htmlFor="dbType">Type de base de données</Label>
        <Select value={dbType} onValueChange={handleDbTypeChange}>
          <SelectTrigger id="dbType">
            <SelectValue placeholder="Sélectionner un type de base de données" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mysql">MySQL</SelectItem>
            <SelectItem value="postgres">PostgreSQL</SelectItem>
            <SelectItem value="sqlite">SQLite</SelectItem>
            <SelectItem value="mock">Base de données simulée (pour test)</SelectItem>
          </SelectContent>
        </Select>
        {dbType === "mock" && (
          <p className="text-xs text-muted-foreground mt-1">
            La base de données simulée utilise le stockage local du navigateur. Parfait pour tester l'application.
          </p>
        )}
      </div>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${dbType === "mock" ? "opacity-50" : ""}`}>
        <div className="space-y-2">
          <Label htmlFor="host">Hôte</Label>
          <Input
            id="host"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="localhost ou adresse IP"
            disabled={dbType === "mock"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="port">Port</Label>
          <Input
            id="port"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            placeholder={dbType === "mysql" ? "3306" : "5432"}
            disabled={dbType === "mock"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur de la base de données"
            disabled={dbType === "mock"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe de la base de données"
            disabled={dbType === "mock"}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="database">Nom de la base de données</Label>
          <Input
            id="database"
            value={database}
            onChange={(e) => setDatabase(e.target.value)}
            placeholder="Nom de la base de données"
            disabled={dbType === "mock"}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="tablePrefix">Préfixe des tables (optionnel)</Label>
          <Input
            id="tablePrefix"
            value={tablePrefix}
            onChange={(e) => setTablePrefix(e.target.value)}
            placeholder="ex: edr_"
            disabled={dbType === "mock"}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Les tables seront créées avec ce préfixe (ex: edr_users, edr_inventory)
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          {dbType !== "mock" && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={testConnection}
              className="flex items-center gap-2"
              disabled={isTesting || !host || !port || !username || !database}
            >
              {isTesting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
              {isTesting ? "Test en cours..." : "Tester la connexion"}
            </Button>
          )}
          
          <Button 
            type="button" 
            onClick={initializeDatabase}
            className="flex items-center gap-2"
            disabled={isInitializing || (dbType !== "mock" && !connectionResult?.success)}
          >
            {isInitializing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isInitializing ? "Initialisation en cours..." : "Initialiser les tables"}
          </Button>
        </div>
        
        {connectionResult && dbType !== "mock" && (
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
    </div>
  );
};
