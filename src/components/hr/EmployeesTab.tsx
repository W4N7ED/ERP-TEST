
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePermissions } from '@/hooks/usePermissions';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import EmployeesList from './employees/EmployeesList';
import AddEmployeeDialog from './employees/AddEmployeeDialog';
import { Employee } from '@/types/hr';

// Mock data for employees
const mockEmployees: Employee[] = [
  {
    id: 1,
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    phone: '0612345678',
    position: 'Technicien',
    department: 'Maintenance',
    hireDate: '2020-05-15',
    role: 'Technicien',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'active'
  },
  {
    id: 2,
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@example.com',
    phone: '0687654321',
    position: 'Responsable RH',
    department: 'RH',
    hireDate: '2018-03-10',
    role: 'RH',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: 'active'
  },
  {
    id: 3,
    firstName: 'Pierre',
    lastName: 'Durand',
    email: 'pierre.durand@example.com',
    phone: '0611223344',
    position: 'Commercial',
    department: 'Ventes',
    hireDate: '2021-07-05',
    role: 'Commerçant',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    status: 'active'
  }
];

const EmployeesTab = () => {
  const { hasPermission } = usePermissions();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);

  const canAddEmployee = hasPermission('hr.employees.add');
  
  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || 
           employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
           employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
           employee.department.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAddEmployee = (employee: Omit<Employee, 'id' | 'status'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: employees.length + 1,
      status: 'active' // Explicitly use 'active' as the literal type
    };
    setEmployees([...employees, newEmployee]);
    setIsAddDialogOpen(false);
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un employé..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {canAddEmployee && (
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="whitespace-nowrap"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un employé
          </Button>
        )}
      </div>

      <EmployeesList 
        employees={filteredEmployees} 
        onDelete={handleDeleteEmployee}
      />

      <AddEmployeeDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddEmployee}
      />
    </div>
  );
};

export default EmployeesTab;
