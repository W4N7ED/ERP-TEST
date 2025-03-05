
import { LeaveRequest } from '@/types/hr';

// Extend the LeaveRequest interface to include employee name
export type LeaveRequestWithName = Omit<LeaveRequest, 'approvedBy'> & {
  employeeName: string;
  approvedBy?: string | number;
};

// Mock leave requests data
export const mockLeaveRequests: LeaveRequestWithName[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'Jean Dupont',
    type: 'annual',
    startDate: '2023-05-10',
    endDate: '2023-05-15',
    reason: 'Congés annuels',
    status: 'approved',
    approvedBy: 'Marie Martin'
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Marie Martin',
    type: 'sick',
    startDate: '2023-06-01',
    endDate: '2023-06-03',
    reason: 'Maladie',
    status: 'approved',
    approvedBy: 'Admin'
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Pierre Durand',
    type: 'annual',
    startDate: '2023-07-20',
    endDate: '2023-07-31',
    reason: 'Vacances d\'été',
    status: 'pending'
  },
  {
    id: 4,
    employeeId: 1,
    employeeName: 'Jean Dupont',
    type: 'family',
    startDate: '2023-08-05',
    endDate: '2023-08-07',
    reason: 'Évènement familial',
    status: 'pending'
  },
  {
    id: 5,
    employeeId: 2,
    employeeName: 'Marie Martin',
    type: 'other',
    startDate: '2023-09-15',
    endDate: '2023-09-15',
    halfDay: true,
    reason: 'Rendez-vous personnel',
    status: 'pending'
  }
];
