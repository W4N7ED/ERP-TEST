
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { UserRole } from '@/types/permissions';
import { toast } from "sonner";

interface RoleItemProps {
  role: UserRole;
  description: string;
  isSelected: boolean;
  onSelectRole: (role: UserRole) => void;
  onDeleteRole: (role: UserRole) => void;
}

const RoleItem: React.FC<RoleItemProps> = ({ 
  role,
  description,
  isSelected, 
  onSelectRole, 
  onDeleteRole 
}) => {
  // Handler for deleting a role
  const handleDeleteRole = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (role === "Administrateur") {
      toast.error("Le rôle Administrateur ne peut pas être supprimé");
      return;
    }
    
    onDeleteRole(role);
  };

  return (
    <div 
      className={`flex flex-col p-3 rounded-md cursor-pointer hover:bg-gray-100 ${isSelected ? 'bg-primary/10 border-l-4 border-primary' : ''}`}
      onClick={() => onSelectRole(role)}
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">{role}</span>
        {role !== "Administrateur" && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleDeleteRole}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        )}
      </div>
      <span className="text-xs text-muted-foreground mt-1">{description}</span>
    </div>
  );
};

export default RoleItem;
