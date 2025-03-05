
// Mock contracts data
export const mockContracts = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'Jean Dupont',
    type: 'CDI',
    startDate: '2020-05-15',
    department: 'Maintenance',
    position: 'Technicien',
    grossSalary: 3200,
    status: 'active'
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Marie Martin',
    type: 'CDI',
    startDate: '2018-03-10',
    department: 'RH',
    position: 'Responsable RH',
    grossSalary: 3800,
    status: 'active'
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Pierre Durand',
    type: 'CDD',
    startDate: '2021-07-05',
    endDate: '2022-07-04',
    department: 'Ventes',
    position: 'Commercial',
    grossSalary: 2900,
    status: 'expired'
  }
];

export interface Contract {
  id: number;
  employeeId: number;
  employeeName: string;
  type: string;
  startDate: string;
  endDate?: string;
  department: string;
  position: string;
  grossSalary: number;
  status: 'active' | 'expired';
}
