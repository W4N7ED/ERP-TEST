
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Employee } from '@/types/hr';
import { usePermissions } from '@/hooks/usePermissions';
import { useState } from 'react';
import EmployeeDetailDialog from './EmployeeDetailDialog';
import { Pencil, Trash2, UserPlus, Eye } from 'lucide-react';

interface EmployeesListProps {
  employees: Employee[];
  onDelete: (id: number) => void;
}

const EmployeesList = ({ employees, onDelete }: EmployeesListProps) => {
  const { hasPermission } = usePermissions();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const canEditEmployee = hasPermission('hr.employees.edit');
  const canDeleteEmployee = hasPermission('hr.employees.delete');

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedEmployee(null);
  };

  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md">
        <UserPlus className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">Aucun employé trouvé</h3>
        <p className="text-muted-foreground mt-2 mb-4">
          Aucun employé ne correspond à votre recherche ou aucun employé n'a été ajouté.
        </p>
        {hasPermission('hr.employees.add') && (
          <Button>Ajouter un employé</Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((employee) => (
        <Card key={employee.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center p-4 border-b">
              <div className="flex-shrink-0 mr-4">
                {employee.avatar ? (
                  <img
                    src={employee.avatar}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium">{employee.firstName} {employee.lastName}</h3>
                <p className="text-sm text-muted-foreground">{employee.position}</p>
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Département</p>
                  <p>{employee.department}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date d'embauche</p>
                  <p>{new Date(employee.hireDate).toLocaleDateString()}</p>
                </div>
                <div className="col-span-2 mt-2">
                  <p className="text-muted-foreground">Email</p>
                  <p className="truncate">{employee.email}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-3 bg-gray-50">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleViewDetails(employee)}
              >
                <Eye className="h-4 w-4 mr-1" />
                Détails
              </Button>
              {canEditEmployee && (
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
              )}
              {canDeleteEmployee && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onDelete(employee.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Supprimer
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      
      {selectedEmployee && (
        <EmployeeDetailDialog 
          isOpen={detailsOpen}
          onOpenChange={setDetailsOpen}
          employee={selectedEmployee}
        />
      )}
    </div>
  );
};

export default EmployeesList;
