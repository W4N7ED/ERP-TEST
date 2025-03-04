
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { UserTable } from '@/components/users/UserTable';
import { AddUserDialog } from '@/components/users/AddUserDialog';
import { UserRole } from '@/types/permissions';
import { User } from '@/hooks/permissions/types';

interface UsersTabProps {
  users: User[];
  availableRoles: UserRole[];
  isAddUserDialogOpen: boolean;
  setIsAddUserDialogOpen: (isOpen: boolean) => void;
  onAddUser: (userData: { name: string; role: string }) => Promise<void>;
  onUpdateUser: (userId: number, updatedData: { name?: string; role?: UserRole }) => void;
  onRemoveUser: (userId: number) => void;
}

const UsersTab: React.FC<UsersTabProps> = ({
  users,
  availableRoles,
  isAddUserDialogOpen,
  setIsAddUserDialogOpen,
  onAddUser,
  onUpdateUser,
  onRemoveUser
}) => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Liste des utilisateurs</h2>
        <Button 
          onClick={() => setIsAddUserDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <UserPlus size={16} />
          Ajouter un utilisateur
        </Button>
      </div>
      
      <UserTable 
        users={users.map(user => ({
          id: user.id,
          name: user.name,
          email: `${user.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
          role: user.role,
          status: 'active' as const,
          lastActive: 'Aujourd\'hui'
        }))}
        availableRoles={availableRoles}
        canManageUsers={true}
        onUpdateUserRole={(userId, newRole) => onUpdateUser(userId, { role: newRole })}
        onRemoveUser={(userId) => onRemoveUser(userId)}
      />

      <AddUserDialog
        availableRoles={availableRoles}
        onAddUser={onAddUser}
        isOpen={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
      />
    </div>
  );
};

export default UsersTab;
