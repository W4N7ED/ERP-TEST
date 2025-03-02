
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Permission, UserRole } from '@/types/permissions';
import RoleManagement from '@/components/settings/RoleManagement';
import { usePermissions } from '@/hooks/usePermissions';
import { toast } from 'sonner';

const Settings = () => {
  const { availablePermissions, availableRoles, updateRoles, updateRolePermissions } = usePermissions();

  const handleUpdateRoles = (roles: UserRole[]) => {
    updateRoles(roles);
    // On pourrait ajouter ici d'autres opérations comme la sauvegarde en base de données
  };

  const handleUpdatePermissions = (role: UserRole, permissions: Permission[]) => {
    updateRolePermissions(role, permissions);
    toast.success(`Permissions mises à jour pour le rôle "${role}"`);
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
          <TabsList>
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="roles">Rôles</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="advanced">Avancé</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Paramètres généraux</h2>
              <p className="text-muted-foreground">Cette section sera implémentée prochainement.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h2>
              <p className="text-muted-foreground">Pour gérer les utilisateurs, veuillez vous rendre à la <a href="/users" className="text-primary hover:underline">page des utilisateurs</a>.</p>
            </div>
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
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Paramètres de notifications</h2>
              <p className="text-muted-foreground">Cette section sera implémentée prochainement.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Paramètres avancés</h2>
              <p className="text-muted-foreground">Cette section sera implémentée prochainement.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
