import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { toast } = useToast();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast({
      title: "Thème modifié",
      description: `Le thème a été changé en ${newTheme}.`,
    });
  };

  const handleNotificationsChange = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    toast({
      title: "Notifications modifiées",
      description: `Les notifications sont maintenant ${enabled ? "activées" : "désactivées"}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground mt-1">
            Gérez les paramètres de votre compte et de l'application
          </p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="advanced">Avancé</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Apparence</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="space-y-2">
                  <Label>Thème</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      onClick={() => handleThemeChange("light")}
                    >
                      Clair
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      onClick={() => handleThemeChange("dark")}
                    >
                      Sombre
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      onClick={() => handleThemeChange("system")}
                    >
                      Système
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifications"
                    checked={notificationsEnabled}
                    onCheckedChange={handleNotificationsChange}
                  />
                  <Label htmlFor="notifications">Activer les notifications</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
