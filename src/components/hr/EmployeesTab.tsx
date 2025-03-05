
import { useState } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Employee } from '@/types/hr';
import EmployeesSection from './employees/EmployeesSection';
import { mockEmployees } from './employees/data/employeeData';

const EmployeesTab = () => {
  const { hasPermission } = usePermissions();
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  
  const canAddEmployee = hasPermission('hr.employees.add');

  return (
    <div className="p-6">
      <EmployeesSection 
        employees={employees}
        setEmployees={setEmployees}
        canAddEmployee={canAddEmployee}
      />
    </div>
  );
};

export default EmployeesTab;
