
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { verifyDatabaseConnection } from "@/services/databaseService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  setDbType
}: DatabaseSectionProps) => {
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

  // Mise à jour du port par défaut lorsque le type de base de données change
  const handleDbTypeChange = (value: string) => {
    setDbType(value);
    
    // Définir le port par défaut en fonction du type de base de données
    if (value === "mysql" && (!port || port === "5432")) {
      setPort("3306");
    } else if (value === "postgres" && (!port || port === "3306")) {
      setPort("5432");
    }
  };

  const testConnection = async () => {
    if (!host || !port || !username || !password || !database) {
      toast({
        variant: "destructive",
        title: "Erreur de test",
        description: "Tous les champs de connexion sont requis pour tester la connexion",
      });
      return;
    }

    // Set testing state to true
    setIsTesting(true);

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
      toast({
        variant: "destructive",
        title: "Erreur",
        description: `Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      });
    } finally {
      setIsTesting(false);
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="host">Hôte</Label>
          <Input
            id="host"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="localhost ou adresse IP"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="port">Port</Label>
          <Input
            id="port"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            placeholder={dbType === "mysql" ? "3306" : "5432"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur de la base de données"
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
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="database">Nom de la base de données</Label>
          <Input
            id="database"
            value={database}
            onChange={(e) => setDatabase(e.target.value)}
            placeholder="Nom de la base de données"
          />
        </div>
      </div>
      <div>
        <Button 
          type="button" 
          variant="outline" 
          onClick={testConnection}
          className="mt-2"
          disabled={isTesting}
        >
          {isTesting ? "Test en cours..." : "Tester la connexion"}
        </Button>
      </div>
    </div>
  );
};
