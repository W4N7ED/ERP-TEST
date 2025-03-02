
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CustomButton } from "@/components/ui/custom-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Settings as SettingsIcon,
  Users,
  Wrench,
  Package,
  FolderKanban,
  Receipt,
  Bell,
  Save,
  Upload,
  Clock,
  LayoutDashboard,
  Shield,
  KeyRound,
  Calendar,
  FileText,
  Boxes,
  AlertTriangle,
  Store,
  FileCheck
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className={`flex-1 container mx-auto py-6 px-4 md:px-6 mt-16 ${!isMobile ? 'ml-64' : ''}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
            <p className="text-muted-foreground">
              Configurez l'application selon vos besoins
            </p>
          </div>
          <CustomButton variant="primary" icon={<Save size={16} />}>
            Enregistrer les modifications
          </CustomButton>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <SettingsIcon size={16} /> Général
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users size={16} /> Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="interventions" className="flex items-center gap-2">
              <Wrench size={16} /> Interventions
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package size={16} /> Inventaire
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderKanban size={16} /> Projets
            </TabsTrigger>
            <TabsTrigger value="invoicing" className="flex items-center gap-2">
              <Receipt size={16} /> Devis/Facturation
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} /> Notifications
            </TabsTrigger>
          </TabsList>
          
          {/* Paramètres Généraux */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutDashboard size={18} /> Configuration de base
                </CardTitle>
                <CardDescription>
                  Paramètres généraux de l'application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nom de l'entreprise / Organisation</Label>
                    <Input id="company-name" placeholder="Votre entreprise" defaultValue="TechSupport SAS" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="logo-upload">Logo de l'entreprise</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                        <SettingsIcon size={24} className="text-muted-foreground" />
                      </div>
                      <CustomButton variant="outline" icon={<Upload size={16} />}>
                        Télécharger un logo
                      </CustomButton>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select defaultValue="europe-paris">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un fuseau horaire" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="europe-paris">Europe/Paris (UTC+1)</SelectItem>
                        <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                        <SelectItem value="america-new_york">America/New York (UTC-5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Langue</Label>
                    <Select defaultValue="fr">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench size={18} /> Personnalisation de l'EDR
                </CardTitle>
                <CardDescription>
                  Personnalisez les fonctionnalités clés de l'application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Statuts d'intervention disponibles</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Textarea defaultValue="En attente,En cours,Terminé,Annulé,En pause" 
                        placeholder="Séparés par des virgules" 
                        className="min-h-24" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Entrez les différents statuts séparés par des virgules. Ces valeurs seront utilisées dans tout le système de gestion des interventions.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label>Format de numérotation</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="intervention-format" className="text-sm">Interventions</Label>
                      <Input id="intervention-format" placeholder="Format" defaultValue="INT-{YEAR}-{NUMBER}" />
                      <p className="text-xs text-muted-foreground">Ex: INT-2023-0001</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quote-format" className="text-sm">Devis</Label>
                      <Input id="quote-format" placeholder="Format" defaultValue="DEV-{YEAR}-{NUMBER}" />
                      <p className="text-xs text-muted-foreground">Ex: DEV-2023-0001</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invoice-format" className="text-sm">Factures</Label>
                      <Input id="invoice-format" placeholder="Format" defaultValue="FAC-{YEAR}-{NUMBER}" />
                      <p className="text-xs text-muted-foreground">Ex: FAC-2023-0001</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock size={18} /> Logs & Historique
                </CardTitle>
                <CardDescription>
                  Configuration de la rétention des données et des sauvegardes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="logs-enabled">Activer l'historique des actions</Label>
                    <p className="text-sm text-muted-foreground">
                      Enregistre toutes les actions des utilisateurs dans le système
                    </p>
                  </div>
                  <Switch id="logs-enabled" defaultChecked />
                </div>
                
                <div className="pt-2">
                  <Label htmlFor="logs-retention">Durée de conservation des logs</Label>
                  <Select defaultValue="6">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Sélectionner une durée" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 mois</SelectItem>
                      <SelectItem value="6">6 mois</SelectItem>
                      <SelectItem value="12">1 an</SelectItem>
                      <SelectItem value="24">2 ans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Label>Sauvegarde des données</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Sauvegardes automatiques</p>
                          <p className="text-sm text-muted-foreground">Fréquence hebdomadaire</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div>
                      <CustomButton variant="outline" className="w-full" icon={<Upload size={16} />}>
                        Exporter toutes les données
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Paramètres des Utilisateurs et Rôles */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={18} /> Gestion des rôles
                </CardTitle>
                <CardDescription>
                  Configuration des rôles et des permissions des utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Rôles disponibles</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Textarea defaultValue="Administrateur,Opérateur,Technicien,Gestionnaire de projet,Commercial" 
                        placeholder="Séparés par des virgules" 
                        className="min-h-24" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Définissez les différents rôles disponibles dans le système. Chaque rôle pourra avoir des permissions spécifiques.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label className="text-base font-medium">Permissions par défaut des rôles</Label>
                  <div className="space-y-6 mt-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield size={16} />
                        <Label>Administrateur</Label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-6">
                        <div className="flex items-center space-x-2">
                          <Switch id="admin-all" defaultChecked />
                          <Label htmlFor="admin-all" className="text-sm">Accès complet au système</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Wrench size={16} />
                        <Label>Technicien</Label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-6">
                        <div className="flex items-center space-x-2">
                          <Switch id="tech-interventions" defaultChecked />
                          <Label htmlFor="tech-interventions" className="text-sm">Gestion des interventions</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="tech-inventory" defaultChecked />
                          <Label htmlFor="tech-inventory" className="text-sm">Consultation de l'inventaire</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="tech-projects" defaultChecked />
                          <Label htmlFor="tech-projects" className="text-sm">Consultation des projets</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Receipt size={16} />
                        <Label>Commercial</Label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-6">
                        <div className="flex items-center space-x-2">
                          <Switch id="sales-quotes" defaultChecked />
                          <Label htmlFor="sales-quotes" className="text-sm">Gestion des devis/factures</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="sales-clients" defaultChecked />
                          <Label htmlFor="sales-clients" className="text-sm">Gestion des clients</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <KeyRound size={18} /> Authentification & Sécurité
                </CardTitle>
                <CardDescription>
                  Options de connexion et paramètres de sécurité
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Authentification à deux facteurs (2FA)</Label>
                    <p className="text-sm text-muted-foreground">
                      Exiger la validation par email ou SMS en plus du mot de passe
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="sso-enabled">Single Sign-On (SSO)</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre la connexion via Google, Microsoft ou autre fournisseur
                    </p>
                  </div>
                  <Switch id="sso-enabled" />
                </div>
                
                <div className="pt-2">
                  <Label htmlFor="session-timeout">Durée des sessions</Label>
                  <Select defaultValue="8">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Sélectionner une durée" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 heures</SelectItem>
                      <SelectItem value="4">4 heures</SelectItem>
                      <SelectItem value="8">8 heures</SelectItem>
                      <SelectItem value="24">24 heures</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Les utilisateurs seront déconnectés après cette période d'inactivité
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Paramètres des Interventions */}
          <TabsContent value="interventions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench size={18} /> Types d'interventions
                </CardTitle>
                <CardDescription>
                  Configuration des types d'interventions disponibles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Types d'interventions disponibles</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Textarea 
                        defaultValue="Maintenance préventive,Dépannage,Installation,Upgrade,Diagnostic,Migration,Formation" 
                        placeholder="Séparés par des virgules" 
                        className="min-h-24" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Définissez les différents types d'interventions que vos techniciens peuvent effectuer.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar size={18} /> Planification & Délais
                </CardTitle>
                <CardDescription>
                  Configuration des options de planification des interventions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Créneaux horaires disponibles</Label>
                    <Textarea 
                      defaultValue="09:00-12:00,14:00-17:00" 
                      placeholder="Séparés par des virgules" 
                      className="min-h-20" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Priorités d'intervention</Label>
                    <Textarea 
                      defaultValue="Urgente,Normale,Basse priorité" 
                      placeholder="Séparés par des virgules" 
                      className="min-h-20" />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Label htmlFor="reminder-time">Rappels avant intervention</Label>
                  <Select defaultValue="24">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Sélectionner un délai" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 heure avant</SelectItem>
                      <SelectItem value="12">12 heures avant</SelectItem>
                      <SelectItem value="24">24 heures avant</SelectItem>
                      <SelectItem value="48">48 heures avant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={18} /> Suivi & Rapports
                </CardTitle>
                <CardDescription>
                  Personnalisation des rapports d'intervention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="photos-required">Photos obligatoires</Label>
                    <p className="text-sm text-muted-foreground">
                      Exiger des photos avant/après pour chaque intervention
                    </p>
                  </div>
                  <Switch id="photos-required" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="signature-required">Signature client obligatoire</Label>
                    <p className="text-sm text-muted-foreground">
                      Exiger une signature numérique du client à la fin de l'intervention
                    </p>
                  </div>
                  <Switch id="signature-required" defaultChecked />
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label>Champs personnalisés pour les rapports</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Textarea 
                        defaultValue="Tests effectués,Pièces remplacées,Commentaires,Durée de l'intervention" 
                        placeholder="Séparés par des virgules" 
                        className="min-h-24" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Définissez les champs supplémentaires à inclure dans les rapports d'intervention.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Paramètres de Gestion du Stock */}
          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Boxes size={18} /> Catégorisation du Matériel
                </CardTitle>
                <CardDescription>
                  Configuration des catégories de matériel en stock
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Catégories principales</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Textarea 
                        defaultValue="Imprimantes,Stockage (SSD/HDD),Réseaux (Routeurs/Switchs),Mémoire (RAM),PC Portables,PC Fixes,Périphériques,Câblage,Serveurs" 
                        placeholder="Séparés par des virgules" 
                        className="min-h-24" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Définissez les catégories principales pour organiser votre inventaire.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label>Sous-catégories</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Select defaultValue="stockage">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="imprimantes">Imprimantes</SelectItem>
                          <SelectItem value="stockage">Stockage (SSD/HDD)</SelectItem>
                          <SelectItem value="reseaux">Réseaux (Routeurs/Switchs)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Textarea 
                        defaultValue="SSD Interne,SSD Externe,HDD Interne,HDD Externe,NAS" 
                        placeholder="Sous-catégories séparées par des virgules" 
                        className="min-h-24" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle size={18} /> Suivi & Alertes
                </CardTitle>
                <CardDescription>
                  Configuration des alertes de stock et du suivi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-update">Mise à jour automatique du stock</Label>
                    <p className="text-sm text-muted-foreground">
                      Déduire automatiquement les composants utilisés lors des interventions
                    </p>
                  </div>
                  <Switch id="auto-update" defaultChecked />
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label>Définition des seuils d'alerte</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="threshold-critical" className="text-sm">Seuil critique</Label>
                      <div className="flex items-center gap-2">
                        <Input id="threshold-critical" type="number" defaultValue="2" />
                        <p className="text-sm text-muted-foreground">unités</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="threshold-warning" className="text-sm">Seuil d'avertissement</Label>
                      <div className="flex items-center gap-2">
                        <Input id="threshold-warning" type="number" defaultValue="5" />
                        <p className="text-sm text-muted-foreground">unités</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label>Emplacements de stock</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Textarea 
                        defaultValue="Stock central,Stock atelier,Stock technicien mobile,Stock client" 
                        placeholder="Séparés par des virgules" 
                        className="min-h-20" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Définissez les différents emplacements physiques de votre stock.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store size={18} /> Fournisseurs & Commandes
                </CardTitle>
                <CardDescription>
                  Gestion des fournisseurs et des commandes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-order">Commandes automatiques</Label>
                    <p className="text-sm text-muted-foreground">
                      Créer automatiquement une proposition de commande lorsque le stock atteint le seuil critique
                    </p>
                  </div>
                  <Switch id="auto-order" />
                </div>
                
                <div className="pt-2">
                  <Label htmlFor="default-supplier">Fournisseur par défaut</Label>
                  <Select defaultValue="tech-distrib">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Sélectionner un fournisseur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech-distrib">Tech Distribution</SelectItem>
                      <SelectItem value="it-wholesale">IT Wholesale</SelectItem>
                      <SelectItem value="computer-parts">Computer Parts Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <CustomButton variant="outline" icon={<FileCheck size={16} />}>
                    Gérer la liste des fournisseurs
                  </CustomButton>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Paramètres de Gestion de Projet */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderKanban size={18} /> Structure des projets
                </CardTitle>
                <CardDescription>
                  Configuration des types de projets disponibles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Types de projets</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Textarea 
                        defaultValue="Installation réseau,Migration serveur,Déploiement d'équipements,Audit informatique,Refonte infrastructure" 
                        placeholder="Séparés par des virgules" 
                        className="min-h-24" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Définissez les différents types de projets que votre entreprise peut gérer.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="templates-enabled">Modèles de projets</Label>
                    <p className="text-sm text-muted-foreground">
                      Activer la création et l'utilisation de modèles avec étapes prédéfinies
                    </p>
                  </div>
                  <Switch id="templates-enabled" defaultChecked />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar size={18} /> Planification
                </CardTitle>
                <CardDescription>
                  Options de planification des projets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Statuts de projet disponibles</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Textarea 
                        defaultValue="À faire,En cours,En pause,Terminé,Annulé" 
                        placeholder="Séparés par des virgules" 
                        className="min-h-20" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Définissez les différents statuts disponibles pour vos projets.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="gantt-view">Vue Gantt des projets</Label>
                    <p className="text-sm text-muted-foreground">
                      Activer la visualisation des projets sous forme de diagramme de Gantt
                    </p>
                  </div>
                  <Switch id="gantt-view" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="resource-allocation">Allocation des ressources</Label>
                    <p className="text-sm text-muted-foreground">
                      Activer le suivi des ressources humaines allouées aux projets
                    </p>
                  </div>
                  <Switch id="resource-allocation" defaultChecked />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={18} /> Suivi et Reporting
                </CardTitle>
                <CardDescription>
                  Configuration du suivi et des rapports de projet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-reports">Rapports automatiques</Label>
                    <p className="text-sm text-muted-foreground">
                      Générer automatiquement des rapports d'avancement hebdomadaires
                    </p>
                  </div>
                  <Switch id="auto-reports" />
                </div>
                
                <div className="pt-2">
                  <Label htmlFor="dashboard-metrics">Métriques prioritaires du tableau de bord</Label>
                  <Select defaultValue="progress">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Sélectionner une métrique" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="progress">Pourcentage d'avancement</SelectItem>
                      <SelectItem value="deadline">Délai restant</SelectItem>
                      <SelectItem value="budget">Budget consommé</SelectItem>
                      <SelectItem value="resources">Ressources allouées</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="client-access">Accès client au suivi</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre aux clients de consulter l'avancement de leurs projets
                    </p>
                  </div>
                  <Switch id="client-access" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Paramètres des Devis & Facturation */}
          <TabsContent value="invoicing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt size={18} /> Modèles de devis
                </CardTitle>
                <CardDescription>
                  Personnalisation des devis et options associées
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Statuts de devis disponibles</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Textarea 
                        defaultValue="Brouillon,En attente,Accepté,Refusé,Expiré" 
                        placeholder="Séparés par des virgules" 
                        className="min-h-20" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Définissez les différents statuts disponibles pour vos devis.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label htmlFor="quote-validity">Validité des devis</Label>
                  <div className="flex items-center gap-2">
                    <Input id="quote-validity" type="number" defaultValue="30" className="max-w-[100px]" />
                    <p className="text-sm">jours</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Durée de validité par défaut de vos devis
                  </p>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label htmlFor="legal-mentions">Mentions légales</Label>
                  <Textarea 
                    id="legal-mentions"
                    defaultValue="Devis valable 30 jours à compter de sa date d'émission. Conditions générales de vente consultables sur www.exemple.com/cgv" 
                    className="min-h-20" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt size={18} /> Facturation
                </CardTitle>
                <CardDescription>
                  Configuration des options de facturation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-invoice">Facturation automatique</Label>
                    <p className="text-sm text-muted-foreground">
                      Générer automatiquement une facture lorsqu'un devis est accepté
                    </p>
                  </div>
                  <Switch id="auto-invoice" defaultChecked />
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label htmlFor="payment-terms">Conditions de paiement</Label>
                  <Select defaultValue="30">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Sélectionner une condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Paiement immédiat</SelectItem>
                      <SelectItem value="15">15 jours</SelectItem>
                      <SelectItem value="30">30 jours</SelectItem>
                      <SelectItem value="45">45 jours</SelectItem>
                      <SelectItem value="60">60 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label htmlFor="vat-rate">Taux de TVA par défaut</Label>
                  <div className="flex items-center gap-2">
                    <Input id="vat-rate" type="number" defaultValue="20" className="max-w-[100px]" />
                    <p className="text-sm">%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell size={18} /> Notifications & Relances
                </CardTitle>
                <CardDescription>
                  Configuration des notifications pour devis et factures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-reminders">Relances automatiques</Label>
                    <p className="text-sm text-muted-foreground">
                      Envoyer automatiquement des relances pour les devis et factures en attente
                    </p>
                  </div>
                  <Switch id="auto-reminders" defaultChecked />
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label htmlFor="reminder-days">Délai avant relance</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="quote-reminder" className="text-sm">Devis (jours)</Label>
                      <Input id="quote-reminder" type="number" defaultValue="7" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invoice-reminder" className="text-sm">Factures (jours)</Label>
                      <Input id="invoice-reminder" type="number" defaultValue="3" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label htmlFor="email-template">Modèle d'email</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Sélectionner un modèle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="professional">Professionnel</SelectItem>
                      <SelectItem value="detailed">Détaillé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Paramètres des Notifications & Alertes */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell size={18} /> Types de notifications
                </CardTitle>
                <CardDescription>
                  Configuration des notifications système
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base font-medium">Notifications d'interventions</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2 mt-1">
                    <div className="flex items-center space-x-2">
                      <Switch id="notif-new-intervention" defaultChecked />
                      <Label htmlFor="notif-new-intervention" className="text-sm">Nouvelle intervention</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="notif-intervention-status" defaultChecked />
                      <Label htmlFor="notif-intervention-status" className="text-sm">Changement de statut</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="notif-intervention-complete" defaultChecked />
                      <Label htmlFor="notif-intervention-complete" className="text-sm">Intervention terminée</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="notif-intervention-reminder" defaultChecked />
                      <Label htmlFor="notif-intervention-reminder" className="text-sm">Rappel d'intervention</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label className="text-base font-medium">Notifications de stock</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2 mt-1">
                    <div className="flex items-center space-x-2">
                      <Switch id="notif-low-stock" defaultChecked />
                      <Label htmlFor="notif-low-stock" className="text-sm">Stock faible</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="notif-out-of-stock" defaultChecked />
                      <Label htmlFor="notif-out-of-stock" className="text-sm">Rupture de stock</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="notif-order-status" defaultChecked />
                      <Label htmlFor="notif-order-status" className="text-sm">Statut des commandes</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label className="text-base font-medium">Notifications de factures/devis</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2 mt-1">
                    <div className="flex items-center space-x-2">
                      <Switch id="notif-quote-accepted" defaultChecked />
                      <Label htmlFor="notif-quote-accepted" className="text-sm">Devis accepté</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="notif-quote-rejected" defaultChecked />
                      <Label htmlFor="notif-quote-rejected" className="text-sm">Devis refusé</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="notif-invoice-paid" defaultChecked />
                      <Label htmlFor="notif-invoice-paid" className="text-sm">Facture payée</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="notif-invoice-overdue" defaultChecked />
                      <Label htmlFor="notif-invoice-overdue" className="text-sm">Facture en retard</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell size={18} /> Canaux de notifications
                </CardTitle>
                <CardDescription>
                  Configuration des méthodes de notification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notif">Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">
                      Envoyer des notifications par email à l'utilisateur concerné
                    </p>
                  </div>
                  <Switch id="email-notif" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notif">Notifications par SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Envoyer des notifications par SMS pour les alertes critiques
                    </p>
                  </div>
                  <Switch id="sms-notif" />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notif">Notifications push</Label>
                    <p className="text-sm text-muted-foreground">
                      Envoyer des notifications push sur les appareils mobiles
                    </p>
                  </div>
                  <Switch id="push-notif" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="teams-notif">Intégration avec Teams/Slack</Label>
                    <p className="text-sm text-muted-foreground">
                      Envoyer des notifications dans vos canaux Teams ou Slack
                    </p>
                  </div>
                  <Switch id="teams-notif" />
                </div>
                
                <div className="pt-4">
                  <Label htmlFor="notification-recipients">Destinataires par défaut</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="role-selection" className="text-sm">Sélectionner par rôle</Label>
                      <Select defaultValue="admin">
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Sélectionner un rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrateurs</SelectItem>
                          <SelectItem value="tech">Techniciens</SelectItem>
                          <SelectItem value="operator">Opérateurs</SelectItem>
                          <SelectItem value="project">Gestionnaires de projet</SelectItem>
                          <SelectItem value="sales">Commerciaux</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <CustomButton variant="outline" size="sm">
                        Ajouter à la liste
                      </CustomButton>
                    </div>
                  </div>
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

