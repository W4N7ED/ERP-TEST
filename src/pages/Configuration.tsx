
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Configuration = () => {
  const [appName, setAppName] = useState("");
  const [host, setHost] = useState("localhost");
  const [port, setPort] = useState("5432");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if app is already configured
    const config = localStorage.getItem("app_config");
    if (config) {
      const parsedConfig = JSON.parse(config);
      setAppName(parsedConfig.appName || "");
      setHost(parsedConfig.host || "localhost");
      setPort(parsedConfig.port || "5432");
      setUsername(parsedConfig.username || "");
      setPassword(parsedConfig.password || "");
      setDatabase(parsedConfig.database || "");
      setIsConfigured(parsedConfig.isConfigured || false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!appName) {
      toast({
        variant: "destructive",
        title: "Erreur de configuration",
        description: "Le nom de l'application est requis",
      });
      return;
    }

    if (!host || !port || !username || !password || !database) {
      toast({
        variant: "destructive",
        title: "Erreur de configuration",
        description: "Tous les champs de connexion à la base de données sont requis",
      });
      return;
    }

    // Save configuration
    const configData = {
      appName,
      host,
      port,
      username,
      password,
      database,
      isConfigured: true,
      configuredAt: new Date().toISOString(),
    };

    localStorage.setItem("app_config", JSON.stringify(configData));
    
    toast({
      title: "Configuration sauvegardée",
      description: "La configuration de l'application a été enregistrée avec succès",
    });

    // Redirect to login page
    navigate("/login");
  };

  const testConnection = () => {
    if (!host || !port || !username || !password || !database) {
      toast({
        variant: "destructive",
        title: "Erreur de test",
        description: "Tous les champs de connexion sont requis pour tester la connexion",
      });
      return;
    }

    // Simulate connection test
    toast({
      title: "Test de connexion",
      description: "Tentative de connexion à la base de données...",
    });

    // This would be replaced by an actual connection test in a real application
    setTimeout(() => {
      toast({
        title: "Connexion réussie",
        description: "La connexion à la base de données a été établie avec succès",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Configuration de l'application</CardTitle>
            <CardDescription className="text-center">
              Configurez les paramètres de votre application pour commencer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informations générales</h3>
                <div className="space-y-2">
                  <Label htmlFor="appName">Nom de l'application</Label>
                  <Input
                    id="appName"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="EDR Solution"
                    required
                  />
                </div>
              </div>

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
                  >
                    Tester la connexion
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Textarea
                  id="notes"
                  placeholder="Notes ou informations supplémentaires concernant cette configuration"
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex gap-4 justify-end">
                <Button type="submit" className="w-full md:w-auto">
                  Enregistrer la configuration
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            <p>Cette configuration sera stockée localement sur votre appareil Linux</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Configuration;
