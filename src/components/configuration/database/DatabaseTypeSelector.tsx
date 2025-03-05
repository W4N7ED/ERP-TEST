
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
          <SelectItem value="postgres">PostgreSQL</SelectItem>
          <SelectItem value="mysql">MySQL</SelectItem>
          <SelectItem value="sqlite">SQLite (Local)</SelectItem>
        </SelectContent>
      </Select>
      
      {dbType === "postgres" && (
        <p className="text-xs text-muted-foreground mt-1">
          PostgreSQL fournit la meilleure performance et évolutivité pour les applications en production.
        </p>
      )}
      
      {dbType === "sqlite" && (
        <p className="text-xs text-muted-foreground mt-1">
          SQLite est recommandé pour le mode démo ou pour un usage personnel sans installation supplémentaire.
        </p>
      )}
    </div>
  );
};
