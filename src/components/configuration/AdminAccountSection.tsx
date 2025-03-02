
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AdminAccountSectionProps {
  createAdmin: boolean;
  setCreateAdmin: (value: boolean) => void;
  adminName: string;
  setAdminName: (value: string) => void;
  adminEmail: string;
  setAdminEmail: (value: string) => void;
  adminPassword: string;
  setAdminPassword: (value: string) => void;
}

export const AdminAccountSection = ({
  createAdmin,
  setCreateAdmin,
  adminName,
  setAdminName,
  adminEmail,
  setAdminEmail,
  adminPassword,
  setAdminPassword,
}: AdminAccountSectionProps) => {
  return (
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
  );
};
