import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { initDatabase } from "@/services/databaseService";

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
}: DatabaseSectionProps) => {
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

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
      // Use the new service instead of direct pg connection
      const result = await initDatabase(host, port, username, password, database);
      
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
            placeholder="5432"
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
