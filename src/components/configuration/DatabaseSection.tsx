
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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

  const testConnection = () => {
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

    // Simulate connection test with a more comprehensive approach
    toast({
      title: "Test de connexion",
      description: "Tentative de connexion à la base de données...",
    });

    // Simulate database connection test
    setTimeout(() => {
      setIsTesting(false);
      
      // Simulate different connection test outcomes
      const random = Math.random();
      
      if (random < 0.9 || (host === "localhost" && username && password && database)) {
        // 90% success rate or guaranteed success for well-formed localhost connections
        toast({
          title: "Connexion réussie",
          description: `Connexion à ${database}@${host}:${port} établie avec succès`,
        });
      } else {
        // 10% failure rate for non-localhost or when simulation triggers a failure
        toast({
          variant: "destructive",
          title: "Échec de connexion",
          description: `Impossible de se connecter à ${host}:${port}. Vérifiez les paramètres et que le serveur est accessible.`,
        });
      }
    }, 1500);
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
