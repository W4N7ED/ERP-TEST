
export type LeaveType = 
  | 'paid'
  | 'unpaid'
  | 'sick'
  | 'maternity'
  | 'paternity'
  | 'bereavement'
  | 'rtt'
  | 'other';

export interface LeaveRequest {
  id: number;
  employeeId: number;
  type: LeaveType;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  halfDay?: boolean;
  totalDays: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approvedBy?: number; // User ID of the approver
  approvalDate?: string; // ISO date string
  attachments?: string[]; // URLs to supporting documents
  comments?: LeaveComment[];
}

export interface LeaveComment {
  id: number;
  requestId: number;
  userId: number;
  comment: string;
  timestamp: string; // ISO date string
}

export interface LeaveBalance {
  id: number;
  employeeId: number;
  year: number;
  leaveType: LeaveType;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
  expiryDate?: string; // ISO date string, optional
}
