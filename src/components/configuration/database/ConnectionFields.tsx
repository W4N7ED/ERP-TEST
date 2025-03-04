
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ConnectionFieldsProps {
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
  tablePrefix: string;
  setTablePrefix: (value: string) => void;
  disabled: boolean;
}

export const ConnectionFields = ({
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
  tablePrefix,
  setTablePrefix,
  disabled
}: ConnectionFieldsProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${disabled ? "opacity-50" : ""}`}>
      <div className="space-y-2">
        <Label htmlFor="host">Hôte</Label>
        <Input
          id="host"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="localhost ou adresse IP"
          disabled={disabled}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="port">Port</Label>
        <Input
          id="port"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          placeholder={disabled ? "" : port || "3306"}
          disabled={disabled}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">Nom d'utilisateur</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nom d'utilisateur de la base de données"
          disabled={disabled}
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
          disabled={disabled}
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="database">Nom de la base de données</Label>
        <Input
          id="database"
          value={database}
          onChange={(e) => setDatabase(e.target.value)}
          placeholder="Nom de la base de données"
          disabled={disabled}
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="tablePrefix">Préfixe des tables (optionnel)</Label>
        <Input
          id="tablePrefix"
          value={tablePrefix}
          onChange={(e) => setTablePrefix(e.target.value)}
          placeholder="ex: edr_"
          disabled={disabled}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Les tables seront créées avec ce préfixe (ex: edr_users, edr_inventory)
        </p>
      </div>
    </div>
  );
};
