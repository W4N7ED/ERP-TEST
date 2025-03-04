
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";
import { useFormValidation } from "@/hooks/configuration/useFormValidation";
import { useAdminAccount } from "@/hooks/configuration/useAdminAccount";
import { useDatabaseSetup } from "@/hooks/configuration/useDatabaseSetup";
import { ConfigurationState } from "@/types/configuration";

export type { ConfigurationState };

export const useConfigurationState = () => {
  const [state, setState] = useState<ConfigurationState>({
    appName: "",
    host: "localhost",
    port: "3306",
    username: "",
    password: "",
    database: "",
    dbType: "mysql",
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
  const { validateForm } = useFormValidation(state, toast);
  const { setupAdminAccount } = useAdminAccount(state, toast);
  const { initializeDatabase } = useDatabaseSetup(state, toast);

  const updateField = <K extends keyof ConfigurationState>(field: K, value: ConfigurationState[K]) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const config = localStorage.getItem("app_config");
    if (config) {
      try {
        const parsedConfig = JSON.parse(config);
        setState(prev => ({
          ...prev,
          appName: parsedConfig.appName || "",
          host: parsedConfig.host || "localhost",
          port: parsedConfig.port || "3306",
          username: parsedConfig.username || "",
          password: parsedConfig.password || "",
          database: parsedConfig.database || "",
          dbType: parsedConfig.dbType || "mysql",
          isConfigured: parsedConfig.isConfigured || false,
          
          adminName: parsedConfig.adminConfig?.name || "Administrateur",
          adminEmail: parsedConfig.adminConfig?.email || "admin@example.com",
          adminPassword: parsedConfig.adminConfig?.password || "admin123",
          createAdmin: parsedConfig.adminConfig?.createAdmin !== false,
          
          notes: parsedConfig.notes || ""
        }));
      } catch (error) {
        console.error("Failed to parse configuration from localStorage:", error);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    updateField('isInitializing', true);
    
    try {
      const initResult = await initializeDatabase();
      if (!initResult.success) {
        updateField('isInitializing', false);
        return;
      }

      if (state.createAdmin) {
        const adminSetupResult = await setupAdminAccount();
        if (!adminSetupResult.success) {
          updateField('isInitializing', false);
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
        description: `Une erreur s'est produite lors de l'initialisation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
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
