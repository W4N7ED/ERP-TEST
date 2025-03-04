
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Card } from '@/components/ui/card';
import GeneralSettings from '@/components/settings/GeneralSettings';
import RolesSettings from '@/components/settings/RolesSettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import AdvancedSettings from '@/components/settings/AdvancedSettings';
import { usePermissions } from '@/hooks/usePermissions';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { hasPermission } = usePermissions();
  
  // Vérifier les permissions pour voir certains onglets
  const canManageUsers = hasPermission("users.view");
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground mt-1">Configurez les paramètres de l'application</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full md:w-auto flex overflow-x-auto mb-6">
            <TabsTrigger value="general">Général</TabsTrigger>
            {canManageUsers && <TabsTrigger value="users">Utilisateurs & Rôles</TabsTrigger>}
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="advanced">Avancé</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <GeneralSettings />
          </TabsContent>
          
          {canManageUsers && (
            <TabsContent value="users" className="space-y-6">
              <RolesSettings />
            </TabsContent>
          )}
          
          <TabsContent value="appearance" className="space-y-6">
            <AppearanceSettings />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <AdvancedSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
