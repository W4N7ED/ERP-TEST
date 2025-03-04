
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DatabaseTypeSelectorProps {
  dbType: string;
  onChange: (value: string) => void;
}

export const DatabaseTypeSelector = ({ dbType, onChange }: DatabaseTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="dbType">Type de base de données</Label>
      <Select value={dbType} onValueChange={onChange}>
        <SelectTrigger id="dbType">
          <SelectValue placeholder="Sélectionner un type de base de données" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mysql">MySQL</SelectItem>
          <SelectItem value="postgres">PostgreSQL</SelectItem>
          <SelectItem value="sqlite">SQLite</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
