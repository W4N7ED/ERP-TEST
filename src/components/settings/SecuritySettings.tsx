
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const SecuritySettings = () => {
  const { toast } = useToast();

  const handleSavePassword = () => {
    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été mis à jour avec succès.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sécurité du compte</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Mot de passe actuel</Label>
          <Input id="current-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">Nouveau mot de passe</Label>
          <Input id="new-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
          <Input id="confirm-password" type="password" />
        </div>
        <div>
          <Button onClick={handleSavePassword}>Modifier le mot de passe</Button>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-2">
          <Label>Authentification à deux facteurs</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="2fa" />
            <Label htmlFor="2fa">Activer l'authentification à deux facteurs</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
