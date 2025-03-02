
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePermissions } from '@/hooks/usePermissions';
import ProfilePersonalInfo from '@/components/profile/ProfilePersonalInfo';
import ProfileSecurity from '@/components/profile/ProfileSecurity';
import ProfileDisplay from '@/components/profile/ProfileDisplay';
import ProfilePermissions from '@/components/profile/ProfilePermissions';
import ProfileIntegrations from '@/components/profile/ProfileIntegrations';

const Profile = () => {
  const { currentUser } = usePermissions();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Mon profil</h1>
          <p className="text-muted-foreground mt-1">Gérez vos informations et préférences</p>
        </div>
        
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="w-full md:w-auto flex overflow-x-auto">
            <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="display">Préférences d'affichage</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-6">
            <ProfilePersonalInfo user={currentUser} />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <ProfileSecurity />
          </TabsContent>
          
          <TabsContent value="display" className="space-y-6">
            <ProfileDisplay />
          </TabsContent>
          
          <TabsContent value="permissions" className="space-y-6">
            <ProfilePermissions user={currentUser} />
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-6">
            <ProfileIntegrations />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
