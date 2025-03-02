
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Laptop, Loader2, LogOut, ShieldCheck, Smartphone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ConnectedDevice {
  id: string;
  name: string;
  type: 'mobile' | 'desktop';
  lastUsed: string;
  location: string;
  isCurrentDevice: boolean;
}

const ProfileSecurity: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [connectedDevices, setConnectedDevices] = useState<ConnectedDevice[]>([
    {
      id: '1',
      name: 'Chrome sur Windows',
      type: 'desktop',
      lastUsed: 'Actuellement',
      location: 'Paris, France',
      isCurrentDevice: true
    },
    {
      id: '2',
      name: 'Safari sur iPhone',
      type: 'mobile',
      lastUsed: 'Il y a 2 jours',
      location: 'Lyon, France',
      isCurrentDevice: false
    },
    {
      id: '3',
      name: 'Firefox sur Mac',
      type: 'desktop',
      lastUsed: 'Il y a 5 jours',
      location: 'Marseille, France',
      isCurrentDevice: false
    }
  ]);
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Mot de passe modifié avec succès");
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 1000);
  };
  
  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(`Authentification à deux facteurs ${!twoFactorEnabled ? 'activée' : 'désactivée'}`);
  };
  
  const handleLogoutDevice = (deviceId: string) => {
    setConnectedDevices(prev => prev.filter(d => d.id !== deviceId));
    toast.success("Appareil déconnecté");
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Changer votre mot de passe</CardTitle>
          <CardDescription>
            Assurez-vous d'utiliser un mot de passe fort et unique
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Changer le mot de passe
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Authentification à deux facteurs</CardTitle>
          <CardDescription>
            Renforcez la sécurité de votre compte avec une vérification supplémentaire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Activer l'authentification à deux facteurs</Label>
              <p className="text-sm text-muted-foreground">
                Un code de vérification vous sera envoyé par SMS ou email lors de la connexion
              </p>
            </div>
            <Switch
              id="two-factor"
              checked={twoFactorEnabled}
              onCheckedChange={handleTwoFactorToggle}
            />
          </div>
          
          {twoFactorEnabled && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-start">
                <ShieldCheck className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Authentification à deux facteurs activée</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Un code de vérification vous sera envoyé par SMS ou email lors de votre prochaine connexion.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Appareils connectés</CardTitle>
          <CardDescription>
            Gérez les appareils connectés à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {connectedDevices.map((device, index) => (
              <div key={device.id}>
                {index > 0 && <Separator className="my-4" />}
                <div className="flex justify-between items-center">
                  <div className="flex items-start space-x-4">
                    {device.type === 'desktop' ? (
                      <Laptop className="h-8 w-8 text-gray-500" />
                    ) : (
                      <Smartphone className="h-8 w-8 text-gray-500" />
                    )}
                    <div>
                      <h4 className="text-sm font-medium">
                        {device.name}
                        {device.isCurrentDevice && (
                          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            Cet appareil
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Dernière utilisation: {device.lastUsed}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Localisation: {device.location}
                      </p>
                    </div>
                  </div>
                  
                  {!device.isCurrentDevice && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleLogoutDevice(device.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Déconnecter
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSecurity;
