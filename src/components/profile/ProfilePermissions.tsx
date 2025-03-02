
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Permission } from '@/types/permissions';
import { toast } from "sonner";
import { ShieldAlert, Users, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProfilePermissionsProps {
  user: User;
}

const ProfilePermissions: React.FC<ProfilePermissionsProps> = ({ user }) => {
  const permissionCategories = {
    inventory: user.permissions.filter(p => p.startsWith('inventory.')),
    suppliers: user.permissions.filter(p => p.startsWith('suppliers.')),
    projects: user.permissions.filter(p => p.startsWith('projects.')),
    interventions: user.permissions.filter(p => p.startsWith('interventions.')),
    users: user.permissions.filter(p => p.startsWith('users.')),
    quotes: user.permissions.filter(p => p.startsWith('quotes.')),
    clients: user.permissions.filter(p => p.startsWith('clients.')),
  };
  
  const handleRequestRoleChange = () => {
    toast.success("Demande de changement de rôle envoyée à l'administrateur");
  };
  
  const formatPermissionName = (permission: string) => {
    // Remove the prefix (e.g., "inventory.") and capitalize the first letter
    const actionName = permission.split('.')[1];
    return actionName.charAt(0).toUpperCase() + actionName.slice(1);
  };
  
  const getPermissionLabel = (category: string) => {
    switch (category) {
      case 'inventory': return 'Inventaire';
      case 'suppliers': return 'Fournisseurs';
      case 'projects': return 'Projets';
      case 'interventions': return 'Interventions';
      case 'users': return 'Utilisateurs';
      case 'quotes': return 'Devis';
      case 'clients': return 'Clients';
      default: return category;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rôle et permissions</CardTitle>
          <CardDescription>
            Consultez votre rôle et vos permissions dans l'application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="rounded-lg border p-4 bg-muted/20">
              <div className="flex items-start space-x-3">
                <ShieldAlert className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-md font-medium">Votre rôle: <Badge variant="outline" className="ml-1 text-primary">{user.role}</Badge></h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ce rôle détermine vos permissions et accès dans l'application
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={handleRequestRoleChange}
                  >
                    Demander un changement de rôle
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-3">Vos permissions</h3>
              
              <div className="space-y-4">
                {Object.entries(permissionCategories).map(([category, permissions]) => 
                  permissions.length > 0 && (
                    <div key={category} className="rounded-lg border p-4">
                      <h4 className="text-sm font-medium mb-2">{getPermissionLabel(category)}</h4>
                      <div className="flex flex-wrap gap-2">
                        {permissions.map(permission => (
                          <Badge key={permission} variant="secondary">
                            {formatPermissionName(permission)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-md font-medium mb-3">Équipes et projets assignés</h3>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="text-sm font-medium">Équipe principale: Maintenance Industrielle</h4>
                    <p className="text-sm text-muted-foreground">
                      Membre depuis le 12/04/2023
                    </p>
                    <div className="mt-2">
                      <Badge variant="outline" className="mr-2 mb-1">Projet A</Badge>
                      <Badge variant="outline" className="mr-2 mb-1">Projet B</Badge>
                      <Badge variant="outline" className="mr-2 mb-1">Projet C</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex space-x-2">
                <Button variant="outline" size="sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Rejoindre une équipe
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePermissions;
