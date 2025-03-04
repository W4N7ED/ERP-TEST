
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AppInfoSection } from "@/components/configuration/AppInfoSection";
import { DatabaseSection } from "@/components/configuration/DatabaseSection";
import { AdminAccountSection } from "@/components/configuration/AdminAccountSection";
import { NotesSection } from "@/components/configuration/NotesSection";
import { ConfigurationState } from "@/hooks/useConfigurationState";

interface ConfigurationFormProps extends ConfigurationState {
  setAppName: (value: string) => void;
  setHost: (value: string) => void;
  setPort: (value: string) => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setDatabase: (value: string) => void;
  setDbType: (value: string) => void;
  setAdminName: (value: string) => void;
  setAdminEmail: (value: string) => void;
  setAdminPassword: (value: string) => void;
  setCreateAdmin: (value: boolean) => void;
  setNotes: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const ConfigurationForm = ({
  appName,
  host,
  port,
  username,
  password,
  database,
  dbType,
  adminName,
  adminEmail,
  adminPassword,
  createAdmin,
  notes,
  isInitializing,
  setAppName,
  setHost,
  setPort,
  setUsername,
  setPassword,
  setDatabase,
  setDbType,
  setAdminName,
  setAdminEmail,
  setAdminPassword,
  setCreateAdmin,
  setNotes,
  handleSubmit
}: ConfigurationFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AppInfoSection 
        appName={appName} 
        setAppName={setAppName} 
      />
      
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
        dbType={dbType}
        setDbType={setDbType}
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

      <NotesSection 
        notes={notes} 
        setNotes={setNotes} 
      />

      <div className="flex gap-4 justify-end">
        <Button type="submit" className="w-full md:w-auto" disabled={isInitializing}>
          {isInitializing ? "Initialisation en cours..." : "Enregistrer la configuration"}
        </Button>
      </div>
    </form>
  );
};
