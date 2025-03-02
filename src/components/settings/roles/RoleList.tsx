
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { UserRole } from '@/types/permissions';
import { toast } from "sonner";

interface RoleListProps {
  roles: UserRole[];
  selectedRole: UserRole | null;
  onSelectRole: (role: UserRole) => void;
  onDeleteRole: (role: UserRole) => void;
}

const RoleList: React.FC<RoleListProps> = ({ 
  roles, 
  selectedRole, 
  onSelectRole, 
  onDeleteRole 
}) => {
  // Handler for deleting a role
  const handleDeleteRole = (e: React.MouseEvent, roleToDelete: UserRole) => {
    e.stopPropagation();
    
    if (roleToDelete === "Administrateur") {
      toast.error("Le rôle Administrateur ne peut pas être supprimé");
      return;
    }
    
    onDeleteRole(roleToDelete);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rôles disponibles</CardTitle>
        <CardDescription>Sélectionnez un rôle pour configurer ses permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {roles.map((role) => (
            <div 
              key={role} 
              className={`flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 ${selectedRole === role ? 'bg-primary/10 border-l-4 border-primary' : ''}`}
              onClick={() => onSelectRole(role)}
            >
              <span className="font-medium">{role}</span>
              {role !== "Administrateur" && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={(e) => handleDeleteRole(e, role)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleList;
