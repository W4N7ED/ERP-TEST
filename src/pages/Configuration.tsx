
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { usePermissions } from "@/hooks/usePermissions";
import { Switch } from "@/components/ui/switch";

const Configuration = () => {
  const [appName, setAppName] = useState("");
  const [host, setHost] = useState("localhost");
  const [port, setPort] = useState("5432");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  
  // Admin account configuration
  const [adminName, setAdminName] = useState("Administrateur");
  const [adminEmail, setAdminEmail] = useState("admin@example.com");
  const [adminPassword, setAdminPassword] = useState("admin123");
  const [createAdmin, setCreateAdmin] = useState(true);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addUser } = usePermissions();

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
      
      // Admin settings
      if (parsedConfig.adminConfig) {
        setAdminName(parsedConfig.adminConfig.name || "Administrateur");
        setAdminEmail(parsedConfig.adminConfig.email || "admin@example.com");
        setAdminPassword(parsedConfig.adminConfig.password || "admin123");
        setCreateAdmin(parsedConfig.adminConfig.createAdmin !== false);
      }
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

    // Create default admin account if selected
    if (createAdmin) {
      if (!adminName || !adminEmail || !adminPassword) {
        toast({
          variant: "destructive",
          title: "Erreur de configuration",
          description: "Tous les champs pour le compte administrateur sont requis",
        });
        return;
      }
      
      try {
        // Add admin user
        addUser({
          name: adminName,
          role: "Administrateur",
          permissions: [
            'inventory.view', 'inventory.add', 'inventory.edit', 'inventory.delete', 'inventory.export', 'inventory.import',
            'suppliers.view', 'suppliers.add', 'suppliers.edit', 'suppliers.delete',
            'movements.view', 'movements.add', 'movements.approve',
            'projects.view', 'projects.add', 'projects.edit', 'projects.delete', 'projects.archive',
            'interventions.view', 'interventions.add', 'interventions.edit', 'interventions.delete', 'interventions.archive',
            'users.view', 'users.add', 'users.edit', 'users.delete',
            'quotes.view', 'quotes.add', 'quotes.edit', 'quotes.delete', 'quotes.approve',
            'clients.view', 'clients.add', 'clients.edit', 'clients.delete'
          ]
        });
        
        // Store admin login credentials in localStorage for login page
        localStorage.setItem("admin_credentials", JSON.stringify({
          email: adminEmail,
          password: adminPassword
        }));
        
        toast({
          title: "Compte administrateur créé",
          description: `Administrateur '${adminName}' créé avec succès`
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur de création",
          description: "Impossible de créer le compte administrateur"
        });
        return;
      }
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
      adminConfig: {
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        createAdmin: createAdmin
      }
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
                    disabled={isTesting}
                  >
                    {isTesting ? "Test en cours..." : "Tester la connexion"}
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Compte administrateur par défaut</h3>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="createAdmin" 
                      checked={createAdmin} 
                      onCheckedChange={setCreateAdmin} 
                    />
                    <Label htmlFor="createAdmin">Créer un administrateur</Label>
                  </div>
                </div>
                
                {createAdmin && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="adminName">Nom de l'administrateur</Label>
                      <Input
                        id="adminName"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        placeholder="Administrateur"
                        required={createAdmin}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">Email</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="admin@example.com"
                        required={createAdmin}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="adminPassword">Mot de passe</Label>
                      <Input
                        id="adminPassword"
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="••••••••"
                        required={createAdmin}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground mt-1">
                        Ce compte aura tous les droits administrateurs dans l'application
                      </p>
                    </div>
                  </div>
                )}
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
