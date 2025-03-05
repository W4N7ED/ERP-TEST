
import { Employee } from '@/types/hr';

// Mock data for employees
export const mockEmployees: Employee[] = [
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
