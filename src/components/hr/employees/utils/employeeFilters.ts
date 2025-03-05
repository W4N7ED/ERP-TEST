
import { Employee } from '@/types/hr';

export const filterEmployees = (
  employees: Employee[],
  searchQuery: string
): Employee[] => {
  if (!searchQuery.trim()) return employees;
  
  const query = searchQuery.toLowerCase();
  
  return employees.filter(employee => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    return fullName.includes(query) || 
          employee.email.toLowerCase().includes(query) ||
          employee.position.toLowerCase().includes(query) ||
          employee.department.toLowerCase().includes(query);
  });
};
