
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { UserCog, Edit, Trash2 } from 'lucide-react';

export type UserTableItem = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastActive: string;
};

interface UserTableProps {
  users: UserTableItem[];
  availableRoles: string[];
  canManageUsers: boolean;
  onUpdateUserRole: (userId: number, newRole: string) => void;
  onRemoveUser: (userId: number, userName: string) => void;
}

export const UserTable = ({
  users,
  availableRoles,
  canManageUsers,
  onUpdateUserRole,
  onRemoveUser,
}: UserTableProps) => {
  const handleRemoveUser = (userId: number, userName: string) => {
    if (window.confirm(`Are you sure you want to remove ${userName}?`)) {
      onRemoveUser(userId, userName);
    }
  };

  return (
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
                    onValueChange={(value) => onUpdateUserRole(user.id, value)}
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
  );
};
