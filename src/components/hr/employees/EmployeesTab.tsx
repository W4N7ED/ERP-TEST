
import React, { useState } from 'react';
import { useEmployees } from '@/hooks/hr/useEmployees';
import EmployeesList from './EmployeesList';
import EmployeeFilters from './EmployeeFilters';
import AddEmployeeDialog from './AddEmployeeDialog';
import { EmployeeFilters as EmployeeFiltersType, Employee } from '@/types/hr';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';

const EmployeesTab: React.FC = () => {
  const [filters, setFilters] = useState<EmployeeFiltersType>({});
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false);
  
  const { 
    employees, 
    isLoading, 
    addEmployee, 
    updateEmployee, 
    deleteEmployee 
  } = useEmployees();
  
  const filteredEmployees = employees.filter(employee => {
    // Apply department filter
    if (filters.department && employee.department !== filters.department) {
      return false;
    }
    
    // Apply status filter
    if (filters.status && employee.status !== filters.status) {
      return false;
    }
    
    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.jobTitle.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const handleAddEmployee = async (employeeData: Omit<Employee, 'id'>) => {
    try {
      await addEmployee(employeeData);
      toast.success(`L'employé ${employeeData.firstName} ${employeeData.lastName} a été ajouté avec succès`);
      setIsAddEmployeeDialogOpen(false);
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error('Erreur lors de l\'ajout de l\'employé');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gestion des Employés</h2>
        <Button 
          onClick={() => setIsAddEmployeeDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <UserPlus size={16} />
          Ajouter un employé
        </Button>
      </div>
      
      <EmployeeFilters 
        filters={filters} 
        setFilters={setFilters} 
      />
      
      <EmployeesList 
        employees={filteredEmployees} 
        isLoading={isLoading}
        onUpdate={updateEmployee}
        onDelete={deleteEmployee}
      />
      
      <AddEmployeeDialog
        isOpen={isAddEmployeeDialogOpen}
        onOpenChange={setIsAddEmployeeDialogOpen}
        onAddEmployee={handleAddEmployee}
      />
    </div>
  );
};

export default EmployeesTab;
