
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Trash2, Link, Calendar, FileDownload, AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ConnectedAccount {
  id: string;
  provider: string;
  email: string;
  connected: boolean;
  icon: React.ReactNode;
}

const ProfileIntegrations: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    {
      id: '1',
      provider: 'Google',
      email: 'utilisateur@gmail.com',
      connected: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
          <path d="M22 12.5v-2a10 10 0 0 0-20 0v2a10 10 0 0 0 20 0Z" />
          <path d="M13 12.52v4a2.5 2.5 0 0 1-5 0v-4" />
          <path d="M7 3c0 1.2.5 2 1.5 2S10 4.2 10 3" />
          <path d="M14 3c0 1.2.5 2 1.5 2S17 4.2 17 3" />
        </svg>
      )
    },
    {
      id: '2',
      provider: 'Microsoft',
      email: 'utilisateur@outlook.com',
      connected: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      )
    }
  ]);
  
  const [calendarSync, setCalendarSync] = useState<boolean>(true);
  
  const toggleConnection = (id: string) => {
    setAccounts(prev => prev.map(account => {
      if (account.id === id) {
        const newState = !account.connected;
        toast.success(`Compte ${account.provider} ${newState ? 'connecté' : 'déconnecté'}`);
        return { ...account, connected: newState };
      }
      return account;
    }));
  };
  
  const handleDataExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Vos données ont été exportées. Le téléchargement va commencer.");
    }, 1500);
  };
  
  const handleAccountDeletion = () => {
    toast("Cette action est irréversible. Êtes-vous sûr ?", {
      action: {
        label: "Confirmer",
        onClick: () => toast.error("Requête de suppression de compte envoyée à l'administrateur")
      },
      cancel: {
        label: "Annuler",
        onClick: () => {}
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Comptes connectés</CardTitle>
          <CardDescription>
            Gérez les services externes connectés à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accounts.map(account => (
              <div key={account.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-3">
                  {account.icon}
                  <div>
                    <h4 className="text-sm font-medium">{account.provider}</h4>
                    <p className="text-xs text-muted-foreground">
                      {account.email}
                    </p>
                  </div>
                </div>
                <Button 
                  variant={account.connected ? "outline" : "default"} 
                  size="sm" 
                  onClick={() => toggleConnection(account.id)}
                >
                  {account.connected ? "Déconnecter" : "Connecter"}
                </Button>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              <Link className="h-4 w-4 mr-2" />
              Connecter un autre compte
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Synchronisation du calendrier</CardTitle>
          <CardDescription>
            Synchronisez vos interventions et tâches avec votre calendrier
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label htmlFor="calendar-sync">Synchronisation avec Google Calendar</Label>
                  <p className="text-sm text-muted-foreground">
                    Vos interventions et tâches apparaîtront dans votre calendrier Google
                  </p>
                </div>
              </div>
              <Switch 
                id="calendar-sync" 
                checked={calendarSync} 
                onCheckedChange={setCalendarSync} 
              />
            </div>
            
            {!accounts[0].connected && calendarSync && (
              <div className="rounded-md bg-amber-50 p-4 border border-amber-200 text-amber-800">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 mr-2 text-amber-800" />
                  <div>
                    <h4 className="text-sm font-medium">Connexion requise</h4>
                    <p className="text-xs mt-1">
                      Vous devez connecter votre compte Google pour activer la synchronisation du calendrier.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Exportation et suppression de compte</CardTitle>
          <CardDescription>
            Gérez vos données personnelles et votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-start space-x-3">
                <FileDownload className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Exporter vos données personnelles</h4>
                  <p className="text-sm text-muted-foreground">
                    Téléchargez une copie de vos données, y compris votre historique d'activité
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2" 
                    onClick={handleDataExport}
                    disabled={isLoading}
                  >
                    {isLoading ? "Préparation..." : "Exporter les données"}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-red-200 p-4">
              <div className="flex items-start space-x-3">
                <Trash2 className="h-5 w-5 text-red-500" />
                <div>
                  <h4 className="text-sm font-medium text-red-600">Supprimer votre compte</h4>
                  <p className="text-sm text-muted-foreground">
                    Cette action est irréversible et supprimera toutes vos données personnelles
                  </p>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="mt-2" 
                    onClick={handleAccountDeletion}
                  >
                    Demander la suppression du compte
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileIntegrations;
