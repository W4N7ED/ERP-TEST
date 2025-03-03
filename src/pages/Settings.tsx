
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import RoleManagement from "@/components/settings/RoleManagement";
import { usePermissions } from "@/hooks/usePermissions";
import { useThemeContext } from "@/components/ThemeProvider";
import { useAppName } from "@/components/AppNameProvider";
import { Sun, Moon, Monitor } from "lucide-react";

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { toast } = useToast();
  const { 
    hasPermission, 
    availableRoles, 
    availablePermissions, 
    updateRoles, 
    updateRolePermissions 
  } = usePermissions();
  const { theme, setTheme } = useThemeContext();
  const { appName, setAppName } = useAppName();
  const [newAppName, setNewAppName] = useState(appName);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
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

  const handleSavePassword = () => {
    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été mis à jour avec succès.",
    });
  };

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
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            {hasPermission("users.edit") && (
              <TabsTrigger value="roles">Gestion des rôles</TabsTrigger>
            )}
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
                      className="flex items-center gap-2"
                    >
                      <Sun className="h-4 w-4" />
                      Clair
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      onClick={() => handleThemeChange("dark")}
                      className="flex items-center gap-2"
                    >
                      <Moon className="h-4 w-4" />
                      Sombre
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      onClick={() => handleThemeChange("system")}
                      className="flex items-center gap-2"
                    >
                      <Monitor className="h-4 w-4" />
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
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email-notif" defaultChecked />
                    <Label htmlFor="email-notif">Notifications par email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="push-notif" defaultChecked />
                    <Label htmlFor="push-notif">Notifications push</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
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
          </TabsContent>
          
          {hasPermission("users.edit") && (
            <TabsContent value="roles" className="space-y-6">
              <RoleManagement 
                availableRoles={availableRoles}
                availablePermissions={availablePermissions}
                onUpdateRoles={updateRoles}
                onUpdatePermissions={updateRolePermissions}
              />
            </TabsContent>
          )}
          
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
