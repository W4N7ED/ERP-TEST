
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { UserRole } from '@/types/permissions';
import RoleItem from './RoleItem';
import RoleHeader from './RoleHeader';

interface RoleListProps {
  roles: UserRole[];
  selectedRole: UserRole | null;
  onSelectRole: (role: UserRole) => void;
  onDeleteRole: (role: UserRole) => void;
  getRoleDescription: (role: string) => string;
}

const RoleList: React.FC<RoleListProps> = ({ 
  roles, 
  selectedRole, 
  onSelectRole, 
  onDeleteRole,
  getRoleDescription
}) => {
  return (
    <Card>
      <RoleHeader />
      <CardContent>
        <div className="space-y-2">
          {roles.map((role) => (
            <RoleItem 
              key={role} 
              role={role}
              description={getRoleDescription(role)}
              isSelected={selectedRole === role}
              onSelectRole={onSelectRole}
              onDeleteRole={onDeleteRole}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleList;
