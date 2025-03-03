
import { useState, useEffect } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UserTable, UserTableItem } from '@/components/users/UserTable';
import { AddUserDialog } from '@/components/users/AddUserDialog';

const UsersPage = () => {
  const { 
    availableUsers, 
    availableRoles, 
    addUser, 
    removeUser, 
    updateUser,
    hasPermission 
  } = usePermissions();
  
  const [users, setUsers] = useState<UserTableItem[]>([]);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  
  const canManageUsers = hasPermission('users.add') && hasPermission('users.edit');
  
  useEffect(() => {
    // Transform availableUsers to the format needed for the table
    const transformedUsers = availableUsers.map(user => ({
      id: user.id,
      name: user.name,
      email: `${user.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      role: user.role,
      status: 'active' as const,
      lastActive: 'Today'
    }));
    
    setUsers(transformedUsers);
  }, [availableUsers]);
  
  const handleAddUser = async (userData: { name: string; role: string }) => {
    try {
      // Add user with empty permissions array
      const newUser = await addUser({
        name: userData.name,
        role: userData.role,
        permissions: []
      });
      
      setUsers(prev => [...prev, {
        id: newUser.id,
        name: newUser.name,
        email: `${newUser.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        role: newUser.role,
        status: 'active',
        lastActive: 'Just now'
      }]);
      
      toast.success(`User ${newUser.name} added successfully`);
      setIsAddUserDialogOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Failed to add user');
    }
  };
  
  const handleRemoveUser = (userId: number, userName: string) => {
    removeUser(userId);
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast.success(`User ${userName} removed successfully`);
  };
  
  const handleUpdateUserRole = (userId: number, newRole: string) => {
    updateUser(userId, { role: newRole });
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    toast.success(`User role updated successfully`);
  };
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        
        {canManageUsers && (
          <AddUserDialog
            availableRoles={availableRoles}
            onAddUser={handleAddUser}
            isOpen={isAddUserDialogOpen}
            onOpenChange={setIsAddUserDialogOpen}
          />
        )}
      </div>
      
      <UserTable
        users={users}
        availableRoles={availableRoles}
        canManageUsers={canManageUsers}
        onUpdateUserRole={handleUpdateUserRole}
        onRemoveUser={handleRemoveUser}
      />
    </div>
  );
};

export default UsersPage;
