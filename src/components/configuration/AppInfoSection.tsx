
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AppInfoSectionProps {
  appName: string;
  setAppName: (value: string) => void;
}

export const AppInfoSection = ({ appName, setAppName }: AppInfoSectionProps) => {
  return (
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
  );
};
