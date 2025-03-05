
import { useState, useEffect } from 'react';
import { Employee } from '@/types/hr';

// Mock data for employees
const mockEmployees: Employee[] = [
  {
    id: 1,
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    phone: '01 23 45 67 89',
    photoUrl: '',
    jobTitle: 'Technicien senior',
    department: 'Technique',
    role: 'Technicien',
    hireDate: '2019-03-15',
    status: 'active',
    address: '15 Rue de Paris, 75001 Paris',
    notes: 'Spécialiste en réparation de machines industrielles.',
    documents: [
      {
        id: 1,
        employeeId: 1,
        name: 'Contrat CDI',
        type: 'contract',
        fileUrl: '/documents/contrat-jean-dupont.pdf',
        uploadDate: '2019-03-15'
      },
      {
        id: 2,
        employeeId: 1,
        name: 'Fiche de paie Avril 2023',
        type: 'payslip',
        fileUrl: '/documents/paie-jean-dupont-042023.pdf',
        uploadDate: '2023-05-10'
      }
    ]
  },
  {
    id: 2,
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@example.com',
    phone: '01 98 76 54 32',
    photoUrl: '',
    jobTitle: 'Responsable commerciale',
    department: 'Commercial',
    role: 'Manager',
    hireDate: '2020-06-01',
    status: 'active',
    address: '8 Avenue des Champs-Élysées, 75008 Paris',
    notes: 'Gère l\'équipe commerciale et les grands comptes.'
  },
  {
    id: 3,
    firstName: 'Pierre',
    lastName: 'Bernard',
    email: 'pierre.bernard@example.com',
    phone: '01 45 67 89 10',
    photoUrl: '',
    jobTitle: 'Technicien',
    department: 'Technique',
    role: 'Technicien',
    hireDate: '2021-02-15',
    status: 'onLeave',
    address: '25 Rue du Faubourg Saint-Honoré, 75008 Paris'
  },
  {
    id: 4,
    firstName: 'Sophie',
    lastName: 'Dubois',
    email: 'sophie.dubois@example.com',
    phone: '01 34 56 78 90',
    photoUrl: '',
    jobTitle: 'Comptable',
    department: 'Finance',
    role: 'Comptable',
    hireDate: '2018-09-15',
    status: 'active',
    address: '42 Boulevard Haussmann, 75009 Paris',
    emergencyContact: {
      name: 'Marc Dubois',
      relationship: 'Époux',
      phone: '06 12 34 56 78'
    }
  },
  {
    id: 5,
    firstName: 'Thomas',
    lastName: 'Petit',
    email: 'thomas.petit@example.com',
    phone: '01 23 45 67 89',
    photoUrl: '',
    jobTitle: 'Développeur',
    department: 'Support',
    role: 'Support',
    hireDate: '2022-01-10',
    status: 'active',
    address: '10 Rue de Rivoli, 75004 Paris'
  }
];

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    // Simulating API call
    const fetchEmployees = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setEmployees(mockEmployees);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
        setIsLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);
  
  const addEmployee = async (employeeData: Omit<Employee, 'id'>): Promise<Employee> => {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newEmployee: Employee = {
          id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
          ...employeeData
        };
        setEmployees(prev => [...prev, newEmployee]);
        resolve(newEmployee);
      }, 500);
    });
  };
  
  const updateEmployee = async (id: number, updates: Partial<Employee>): Promise<void> => {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setEmployees(prev => 
          prev.map(employee => 
            employee.id === id ? { ...employee, ...updates } : employee
          )
        );
        resolve();
      }, 500);
    });
  };
  
  const deleteEmployee = async (id: number): Promise<void> => {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setEmployees(prev => prev.filter(employee => employee.id !== id));
        resolve();
      }, 500);
    });
  };
  
  return {
    employees,
    isLoading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee
  };
};
