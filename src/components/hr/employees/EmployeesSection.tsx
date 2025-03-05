
import { useState } from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeActions from './EmployeeActions';
import EmployeesList from './EmployeesList';
import AddEmployeeDialog from './AddEmployeeDialog';
import { Employee } from '@/types/hr';
import { filterEmployees } from './utils/employeeFilters';

interface EmployeesSectionProps {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  canAddEmployee: boolean;
}

const EmployeesSection = ({ 
  employees, 
  setEmployees, 
  canAddEmployee 
}: EmployeesSectionProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = filterEmployees(employees, searchQuery);

  const handleAddEmployee = (employee: Omit<Employee, 'id' | 'status'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: employees.length + 1,
      status: 'active'
    };
    setEmployees([...employees, newEmployee]);
    setIsAddDialogOpen(false);
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <EmployeeSearch 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <EmployeeActions 
          canAddEmployee={canAddEmployee} 
          onAddEmployeeClick={() => setIsAddDialogOpen(true)} 
        />
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
    </>
  );
};

export default EmployeesSection;
