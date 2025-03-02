
import React, { useState } from 'react';
import { User } from '@/types/permissions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Camera, Loader2 } from "lucide-react";

interface ProfilePersonalInfoProps {
  user: User;
}

const ProfilePersonalInfo: React.FC<ProfilePersonalInfoProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: 'utilisateur@example.com',
    phone: '06 12 34 56 78',
    address: '123 Rue Principale, 75001 Paris',
    bio: "Technicien de maintenance spécialisé dans les équipements industriels."
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Informations personnelles mises à jour");
    }, 1000);
  };
  
  const handleAvatarUpload = () => {
    // This would typically open a file dialog
    toast.info("Fonctionnalité de téléchargement d'avatar à implémenter");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
        <CardDescription>
          Mettez à jour vos informations de profil
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt={user.name} />
                <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline" size="sm" onClick={handleAvatarUpload} className="mt-2">
                <Camera className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                  />
                  <p className="text-xs text-muted-foreground">
                    Email professionnel (géré par l'administrateur)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  rows={3} 
                  value={formData.bio} 
                  onChange={handleInputChange} 
                  placeholder="Décrivez-vous en quelques mots..."
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfilePersonalInfo;
