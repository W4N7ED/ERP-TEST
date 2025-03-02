
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Permission, UserRole } from '@/types/permissions';
import RoleManagement from '@/components/settings/RoleManagement';
import { usePermissions } from '@/hooks/usePermissions';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const { availablePermissions, availableRoles, updateRoles, updateRolePermissions } = usePermissions();
  const [language, setLanguage] = useState("fr");
  const [theme, setTheme] = useState("system");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [appUpdates, setAppUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [apiUrl, setApiUrl] = useState("https://api.example.com/v1");

  const handleUpdateRoles = (roles: UserRole[]) => {
    updateRoles(roles);
    // On pourrait ajouter ici d'autres opérations comme la sauvegarde en base de données
  };

  const handleUpdatePermissions = (role: UserRole, permissions: Permission[]) => {
    updateRolePermissions(role, permissions);
    toast.success(`Permissions mises à jour pour le rôle "${role}"`);
  };

  const handleSaveGeneralSettings = () => {
    toast.success("Paramètres généraux enregistrés");
  };

  const handleSaveNotificationSettings = () => {
    toast.success("Préférences de notifications enregistrées");
  };

  const handleSaveAdvancedSettings = () => {
    toast.success("Paramètres avancés enregistrés");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground mt-1">Configuration de l'application</p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="w-full md:w-auto flex overflow-x-auto">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="roles">Rôles</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="advanced">Avancé</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres généraux</CardTitle>
                <CardDescription>
                  Configurez les options générales de l'application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nom de l'entreprise</Label>
                    <Input id="company-name" defaultValue="TechMaintenance Pro" />
                    <p className="text-sm text-muted-foreground">
                      Ce nom apparaîtra sur tous les documents et communications
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Langue par défaut</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme">Thème</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un thème" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Clair</SelectItem>
                        <SelectItem value="dark">Sombre</SelectItem>
                        <SelectItem value="system">Système</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Le thème "Système" s'adapte automatiquement aux préférences de votre appareil
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-mode">Mode compact</Label>
                      <p className="text-sm text-muted-foreground">
                        Réduit l'espacement pour afficher plus d'informations à l'écran
                      </p>
                    </div>
                    <Switch id="compact-mode" />
                  </div>
                </div>
                
                <Button onClick={handleSaveGeneralSettings}>Enregistrer les modifications</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <CardDescription>
                  Pour gérer les utilisateurs, veuillez vous rendre à la page dédiée
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-md bg-primary/10 p-4 border border-primary/20">
                  <p className="text-primary font-medium">Fonctionnalité disponible</p>
                  <p className="text-sm mt-1">
                    Pour gérer les utilisateurs, veuillez vous rendre à la <a href="/users" className="text-primary hover:underline">page des utilisateurs</a>.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Paramètres utilisateur</h3>
                  <div className="space-y-2">
                    <Label htmlFor="default-role">Rôle par défaut</Label>
                    <Select defaultValue="Technicien">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRoles.map((role) => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Ce rôle sera attribué par défaut aux nouveaux utilisateurs
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-approve">Approbation automatique</Label>
                      <p className="text-sm text-muted-foreground">
                        Les nouvelles inscriptions seront automatiquement approuvées
                      </p>
                    </div>
                    <Switch id="auto-approve" defaultChecked={false} />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
                      <p className="text-sm text-muted-foreground">
                        Exiger l'authentification à deux facteurs pour tous les utilisateurs
                      </p>
                    </div>
                    <Switch id="two-factor" defaultChecked={true} />
                  </div>
                </div>
                <Button>Enregistrer les modifications</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="roles" className="space-y-6">
            <div className="card-glass rounded-xl p-6">
              <RoleManagement 
                availableRoles={availableRoles}
                availablePermissions={availablePermissions}
                onUpdateRoles={handleUpdateRoles}
                onUpdatePermissions={handleUpdatePermissions}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de notifications</CardTitle>
                <CardDescription>
                  Gérez la façon dont vous recevez les notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Communications</h3>
                  
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Notifications par email</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications par email pour les événements importants
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Notifications push</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications push sur votre appareil
                      </p>
                    </div>
                    <Switch 
                      id="push-notifications" 
                      checked={pushNotifications} 
                      onCheckedChange={setPushNotifications} 
                    />
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6">Type de notifications</h3>
                  
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-updates">Mises à jour de l'application</Label>
                      <p className="text-sm text-muted-foreground">
                        Être informé des nouvelles fonctionnalités et mises à jour
                      </p>
                    </div>
                    <Switch 
                      id="app-updates" 
                      checked={appUpdates} 
                      onCheckedChange={setAppUpdates}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing">Emails marketing</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des informations sur nos nouveaux produits et offres
                      </p>
                    </div>
                    <Switch 
                      id="marketing" 
                      checked={marketingEmails} 
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveNotificationSettings}>Enregistrer les préférences</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres avancés</CardTitle>
                <CardDescription>
                  Configurations avancées pour les administrateurs système
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="rounded-md bg-amber-50 p-4 border border-amber-200 dark:bg-amber-950/50 dark:border-amber-800">
                    <p className="font-medium text-amber-800 dark:text-amber-500">Attention</p>
                    <p className="text-sm mt-1 text-amber-700 dark:text-amber-400">
                      La modification de ces paramètres peut affecter le fonctionnement de l'application. 
                      Procédez avec prudence.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="debug-mode">Mode debug</Label>
                      <p className="text-sm text-muted-foreground">
                        Activer les journaux détaillés et les outils de développement
                      </p>
                    </div>
                    <Switch 
                      id="debug-mode" 
                      checked={debugMode} 
                      onCheckedChange={setDebugMode}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-url">URL de l'API</Label>
                    <Input 
                      id="api-url" 
                      value={apiUrl} 
                      onChange={(e) => setApiUrl(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Point de terminaison principal de l'API
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cache-ttl">Durée de vie du cache (secondes)</Label>
                    <Input id="cache-ttl" type="number" defaultValue="3600" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="custom-css">CSS personnalisé</Label>
                    <Textarea 
                      id="custom-css" 
                      placeholder=".my-class { color: #000; }"
                      className="font-mono"
                    />
                    <p className="text-sm text-muted-foreground">
                      CSS personnalisé qui sera injecté dans l'application
                    </p>
                  </div>
                </div>
                
                <Button onClick={handleSaveAdvancedSettings}>Enregistrer les modifications</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
