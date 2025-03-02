
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { usePermissions } from "@/hooks/usePermissions";
import { AppInfoSection } from "@/components/configuration/AppInfoSection";
import { DatabaseSection } from "@/components/configuration/DatabaseSection";
import { AdminAccountSection } from "@/components/configuration/AdminAccountSection";
import { NotesSection } from "@/components/configuration/NotesSection";

const Configuration = () => {
  const [appName, setAppName] = useState("");
  const [host, setHost] = useState("localhost");
  const [port, setPort] = useState("5432");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  
  // Admin account configuration
  const [adminName, setAdminName] = useState("Administrateur");
  const [adminEmail, setAdminEmail] = useState("admin@example.com");
  const [adminPassword, setAdminPassword] = useState("admin123");
  const [createAdmin, setCreateAdmin] = useState(true);
  
  // Notes section
  const [notes, setNotes] = useState("");
  
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
      
      // Notes
      if (parsedConfig.notes) {
        setNotes(parsedConfig.notes);
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
      },
      notes
    };

    localStorage.setItem("app_config", JSON.stringify(configData));
    
    toast({
      title: "Configuration sauvegardée",
      description: "La configuration de l'application a été enregistrée avec succès",
    });

    // Redirect to login page
    navigate("/login");
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
              <AppInfoSection appName={appName} setAppName={setAppName} />
              
              <DatabaseSection 
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
              />
              
              <Separator />
              
              <AdminAccountSection 
                createAdmin={createAdmin}
                setCreateAdmin={setCreateAdmin}
                adminName={adminName}
                setAdminName={setAdminName}
                adminEmail={adminEmail}
                setAdminEmail={setAdminEmail}
                adminPassword={adminPassword}
                setAdminPassword={setAdminPassword}
              />

              <NotesSection notes={notes} setNotes={setNotes} />

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
