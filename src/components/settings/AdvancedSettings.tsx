
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AdvancedSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres avancés</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
          <Label>Zone dangereuse</Label>
          <p className="text-sm text-muted-foreground">
            Attention, ces actions peuvent avoir des conséquences irréversibles.
          </p>
          <Button variant="destructive">Supprimer mon compte</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSettings;
