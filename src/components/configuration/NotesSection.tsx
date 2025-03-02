
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface NotesSectionProps {
  notes: string;
  setNotes: (value: string) => void;
}

export const NotesSection = ({ notes, setNotes }: NotesSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="notes">Notes (optionnel)</Label>
      <Textarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes ou informations supplémentaires concernant cette configuration"
        className="min-h-[100px]"
      />
    </div>
  );
};
