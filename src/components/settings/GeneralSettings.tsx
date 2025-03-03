
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAppName } from "@/components/AppNameProvider";

const GeneralSettings = () => {
  const { toast } = useToast();
  const { appName, setAppName } = useAppName();
  const [newAppName, setNewAppName] = useState(appName);

  const handleSaveAppName = () => {
    if (newAppName.trim() === '') {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le nom de l'application ne peut pas être vide.",
      });
      return;
    }
    
    setAppName(newAppName);
    toast({
      title: "Nom modifié",
      description: `Le nom de l'application a été changé en "${newAppName}".`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations générales</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom</Label>
          <Input id="name" defaultValue="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue="john.doe@example.com" type="email" />
        </div>
        <div>
          <Button>Mettre à jour les informations</Button>
        </div>

        <Separator className="my-4" />
        
        <div className="space-y-2">
          <Label htmlFor="app-name">Nom de l'application</Label>
          <Input 
            id="app-name" 
            value={newAppName} 
            onChange={(e) => setNewAppName(e.target.value)}
            placeholder="Nom de l'application" 
          />
          <p className="text-sm text-muted-foreground">
            Ce nom sera affiché dans la barre de navigation et partout où le nom de l'application est utilisé.
          </p>
          <Button onClick={handleSaveAppName} className="mt-2">
            Mettre à jour le nom
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
