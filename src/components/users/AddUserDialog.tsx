
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { UserPlus } from 'lucide-react';

interface AddUserDialogProps {
  availableRoles: string[];
  onAddUser: (userData: { name: string; role: string }) => Promise<void>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddUserDialog = ({
  availableRoles,
  onAddUser,
  isOpen,
  onOpenChange,
}: AddUserDialogProps) => {
  const [newUserName, setNewUserName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleAddUser = async () => {
    try {
      await onAddUser({
        name: newUserName,
        role: selectedRole,
      });
      
      // Reset form
      setNewUserName('');
      setSelectedRole('');
    } catch (error) {
      console.error('Error in AddUserDialog:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  );
};
