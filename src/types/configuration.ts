
export interface ConfigurationState {
  appName: string;
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  dbType: string;
  tablePrefix: string;
  isConfigured: boolean;
  isInitializing: boolean;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  createAdmin: boolean;
  notes: string;
}

export interface DatabaseInitResult {
  success: boolean;
  message: string;
  tables?: string[];
}

export interface AdminSetupResult {
  success: boolean;
  message?: string;
}
