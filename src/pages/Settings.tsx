
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { usePermissions } from "@/hooks/usePermissions";
import GeneralSettings from "@/components/settings/GeneralSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import RolesSettings from "@/components/settings/RolesSettings";
import AdvancedSettings from "@/components/settings/AdvancedSettings";

const Settings = () => {
  const { hasPermission } = usePermissions();

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
            <GeneralSettings />
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <AppearanceSettings />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <SecuritySettings />
          </TabsContent>
          
          {hasPermission("users.edit") && (
            <TabsContent value="roles" className="space-y-6">
              <RolesSettings />
            </TabsContent>
          )}
          
          <TabsContent value="advanced" className="space-y-6">
            <AdvancedSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
