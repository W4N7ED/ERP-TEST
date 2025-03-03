
import React from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { Plus, UserCircle2, Folder } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/types/permissions";

interface InventoryActionsProps {
  onAddItem: () => void;
  onExportInventory: () => void;
  onManageCategories: () => void;
  currentUser: User;
  availableUsers: User[];
  onUserChange: (userId: string) => void;
  hasAddPermission: boolean;
  hasExportPermission: boolean;
  hasEditPermission: boolean;
}

const InventoryActions: React.FC<InventoryActionsProps> = ({
  onAddItem,
  onExportInventory,
  onManageCategories,
  currentUser,
  availableUsers,
  onUserChange,
  hasAddPermission,
  hasExportPermission,
  hasEditPermission
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Gestion de l'inventaire</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-muted/30 p-2 rounded-lg">
          <UserCircle2 className="mr-2 text-muted-foreground" size={20} />
          <Select value={currentUser.id.toString()} onValueChange={onUserChange}>
            <SelectTrigger className="border-0 bg-transparent focus:ring-0 w-[180px]">
              <SelectValue placeholder="Changer d'utilisateur" />
            </SelectTrigger>
            <SelectContent>
              {availableUsers.map(user => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.name} ({user.role})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <CustomButton 
          onClick={onAddItem} 
          disabled={!hasAddPermission}
          title={!hasAddPermission ? "Vous n'avez pas les droits" : undefined}
        >
          <Plus size={16} className="mr-2" />
          Nouvel article
        </CustomButton>

        <CustomButton 
          onClick={onManageCategories} 
          disabled={!hasEditPermission}
          variant="outline"
          title={!hasEditPermission ? "Vous n'avez pas les droits" : undefined}
        >
          <Folder size={16} className="mr-2" />
          Gérer catégories
        </CustomButton>
        
        {hasExportPermission && (
          <CustomButton 
            variant="outline" 
            onClick={onExportInventory}
          >
            Exporter
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default InventoryActions;
