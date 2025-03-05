
import React from 'react';
import { Employee } from '@/types/hr';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface EmployeePermissionsProps {
  employee: Employee;
}

const EmployeePermissions: React.FC<EmployeePermissionsProps> = ({ employee }) => {
  // Mock permissions data
  const role = employee.role || 'Non défini';
  
  // Getting sample permissions based on role for display purposes
  const getPermissions = (roleName: string): string[] => {
    switch (roleName) {
      case 'Admin':
        return ['Tous les modules', 'Toutes les fonctionnalités'];
      case 'Technicien':
        return ['Interventions', 'Projets', 'Inventaire (lecture)'];
      case 'Manager':
        return ['Interventions', 'Projets', 'Devis', 'Clients', 'Employés (lecture)'];
      case 'Comptable':
        return ['Finance', 'Factures', 'Devis', 'Clients (lecture)'];
      default:
        return ['Accès limité'];
    }
  };
  
  const permissions = getPermissions(role);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium">Rôle dans l'ERP</h3>
          <div className="flex items-center mt-2">
            <Badge variant="outline" className="text-primary mr-2">{role}</Badge>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Edit size={16} className="mr-2" />
          Modifier les accès
        </Button>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-sm font-medium mb-3">Autorisations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {permissions.map((permission, index) => (
            <Badge key={index} variant="secondary" className="justify-start">
              {permission}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-3">Modules associés</h3>
        <div className="p-4 border rounded-md">
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Gestion des interventions</li>
            <li>Gestion des projets</li>
            <li>Gestion des stocks</li>
            <li>Gestion des clients</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeePermissions;
