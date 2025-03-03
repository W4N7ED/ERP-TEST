import { useState, useEffect } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { UserPlus, Trash2, Edit, UserCog } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type UserTableItem = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastActive: string;
};

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
  const [newUserName, setNewUserName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  
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
  
  const handleAddUser = async () => {
    try {
      // Instead of directly using the Promise result
      const newUser = await addUser({
        name: newUserName,
        role: selectedRole,
        permissions: []
      });
      
      // Now newUser is the resolved value, not a Promise
      toast.success(`User ${newUser.name} added successfully`);
      
      // Use the resolved user properties
      setUsers(prev => [...prev, {
        id: newUser.id,
        name: newUser.name,
        email: `${newUser.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        role: newUser.role,
        status: 'active',
        lastActive: 'Just now'
      }]);
      
      // Reset form
      setNewUserName('');
      setIsAddUserDialogOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Failed to add user');
    }
  };
  
  const handleRemoveUser = (userId: number, userName: string) => {
    if (window.confirm(`Are you sure you want to remove ${userName}?`)) {
      removeUser(userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
      toast.success(`User ${userName} removed successfully`);
    }
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
          <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <UserPlus size={16} />
                Add New User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with specific role.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="role" className="text-right">
                    Role
                  </label>
                  <Select
                    value={selectedRole}
                    onValueChange={setSelectedRole}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={handleAddUser}
                  disabled={!newUserName || !selectedRole}
                >
                  Add User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {canManageUsers ? (
                    <Select
                      defaultValue={user.role}
                      onValueChange={(value) => handleUpdateUserRole(user.id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue>{user.role}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {availableRoles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    user.role
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <UserCog className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {canManageUsers && (
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleRemoveUser(user.id, user.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersPage;
