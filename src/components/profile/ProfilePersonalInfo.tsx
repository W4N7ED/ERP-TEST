
import React, { useState, useEffect } from 'react';
import { User } from '@/types/permissions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import AvatarUpload from './avatar/AvatarUpload';
import { supabase } from '@/integrations/supabase/client';

interface ProfilePersonalInfoProps {
  user: User;
}

const ProfilePersonalInfo: React.FC<ProfilePersonalInfoProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user.name,
    email: '',
    phone: '',
    address: '',
    bio: ""
  });
  
  // Récupérer l'URL de l'avatar au chargement du composant
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (authUser) {
          const { data, error } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('id', authUser.id)
            .single();
            
          if (!error && data) {
            setAvatarUrl(data.avatar_url);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
      }
    };
    
    fetchUserProfile();
  }, []);
  
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
  
  const handleAvatarUpdate = (url: string) => {
    setAvatarUrl(url);
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
              <AvatarUpload 
                currentAvatarUrl={avatarUrl} 
                userName={user.name} 
                onAvatarUpdate={handleAvatarUpdate}
                size="lg"
              />
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
                    placeholder="Votre nom complet"
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
                    placeholder="Votre email"
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
                    placeholder="Votre numéro de téléphone"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange}
                    placeholder="Votre adresse"
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
