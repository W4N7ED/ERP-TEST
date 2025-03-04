import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";
import { initDatabase } from "@/services/databaseService";

export interface ConfigurationState {
  appName: string;
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  dbType: string;
  isConfigured: boolean;
  isInitializing: boolean;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  createAdmin: boolean;
  notes: string;
}

export const useConfigurationState = () => {
  const [state, setState] = useState<ConfigurationState>({
    appName: "",
    host: "localhost",
    port: "5432",
    username: "",
    password: "",
    database: "",
    dbType: "postgres",
    isConfigured: false,
    isInitializing: false,
    adminName: "Administrateur",
    adminEmail: "admin@example.com",
    adminPassword: "admin123",
    createAdmin: true,
    notes: ""
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const { addUser } = usePermissions();

  const updateField = <K extends keyof ConfigurationState>(field: K, value: ConfigurationState[K]) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const config = localStorage.getItem("app_config");
    if (config) {
      const parsedConfig = JSON.parse(config);
      setState(prev => ({
        ...prev,
        appName: parsedConfig.appName || "",
        host: parsedConfig.host || "localhost",
        port: parsedConfig.port || "5432",
        username: parsedConfig.username || "",
        password: parsedConfig.password || "",
        database: parsedConfig.database || "",
        dbType: parsedConfig.dbType || "postgres",
        isConfigured: parsedConfig.isConfigured || false,
        
        adminName: parsedConfig.adminConfig?.name || "Administrateur",
        adminEmail: parsedConfig.adminConfig?.email || "admin@example.com",
        adminPassword: parsedConfig.adminConfig?.password || "admin123",
        createAdmin: parsedConfig.adminConfig?.createAdmin !== false,
        
        notes: parsedConfig.notes || ""
      }));
    }
  }, []);

  const validateForm = () => {
    if (!state.appName) {
      toast({
        variant: "destructive",
        title: "Erreur de configuration",
        description: "Le nom de l'application est requis",
      });
      return false;
    }

    if (state.dbType !== "mock") {
      if (!state.host || !state.port || !state.username || !state.password || !state.database) {
        toast({
          variant: "destructive",
          title: "Erreur de configuration",
          description: "Tous les champs de connexion à la base de données sont requis",
        });
        return false;
      }
    }

    if (state.createAdmin) {
      if (!state.adminName || !state.adminEmail || !state.adminPassword) {
        toast({
          variant: "destructive",
          title: "Erreur de configuration",
          description: "Tous les champs pour le compte administrateur sont requis",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    updateField('isInitializing', true);
    
    try {
      let initResult = { success: true, message: "Configuration réussie", tables: [] as string[] };
      
      if (state.dbType !== "mock") {
        const result = await initDatabase(
          state.host, 
          state.port, 
          state.username, 
          state.password, 
          state.database,
          state.dbType as any
        );
        
        if (!result.success) {
          toast({
            variant: "destructive",
            title: "Erreur d'initialisation",
            description: result.message,
          });
          updateField('isInitializing', false);
          return;
        }
        
        initResult = {
          success: result.success,
          message: result.message,
          tables: result.tables || []
        };
      }

      if (initResult.tables && initResult.tables.length > 0) {
        console.log("Tables créées:", initResult.tables);
      }

      if (state.createAdmin) {
        try {
          addUser({
            name: state.adminName,
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
          
          localStorage.setItem("admin_credentials", JSON.stringify({
            email: state.adminEmail,
            password: state.adminPassword
          }));
          
          toast({
            title: "Compte administrateur créé",
            description: `Administrateur '${state.adminName}' créé avec succès`
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

      const configData = {
        appName: state.appName,
        host: state.host,
        port: state.port,
        username: state.username,
        password: state.password,
        database: state.database,
        dbType: state.dbType,
        isConfigured: true,
        configuredAt: new Date().toISOString(),
        adminConfig: {
          name: state.adminName,
          email: state.adminEmail,
          password: state.adminPassword,
          createAdmin: state.createAdmin
        },
        notes: state.notes
      };

      localStorage.setItem("app_config", JSON.stringify(configData));
      
      toast({
        title: "Configuration sauvegardée",
        description: "La configuration de l'application a été enregistrée avec succès.",
      });

      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur d'initialisation",
        description: `Une erreur s'est produite lors de l'initialisation de la base de données: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      });
    } finally {
      updateField('isInitializing', false);
    }
  };

  return {
    ...state,
    setAppName: (value: string) => updateField('appName', value),
    setHost: (value: string) => updateField('host', value),
    setPort: (value: string) => updateField('port', value),
    setUsername: (value: string) => updateField('username', value),
    setPassword: (value: string) => updateField('password', value),
    setDatabase: (value: string) => updateField('database', value),
    setDbType: (value: string) => updateField('dbType', value),
    setAdminName: (value: string) => updateField('adminName', value),
    setAdminEmail: (value: string) => updateField('adminEmail', value),
    setAdminPassword: (value: string) => updateField('adminPassword', value),
    setCreateAdmin: (value: boolean) => updateField('createAdmin', value),
    setNotes: (value: string) => updateField('notes', value),
    handleSubmit
  };
};
