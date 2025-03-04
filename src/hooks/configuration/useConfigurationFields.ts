
import { useState, useEffect, useCallback } from "react";
import { ConfigurationState } from "@/types/configuration";

export const useConfigurationFields = () => {
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

  const updateField = useCallback(<K extends keyof ConfigurationState>(field: K, value: ConfigurationState[K]) => {
    setState(prev => ({ ...prev, [field]: value }));
  }, []);

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
    updateField
  };
};
