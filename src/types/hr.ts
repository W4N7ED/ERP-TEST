
// Types for HR module

// Employee interface
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  role: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

// Contract interface
export interface Contract {
  id: number;
  employeeId: number;
  type: 'CDI' | 'CDD' | 'Freelance' | 'Stage' | 'Autre';
  startDate: string;
  endDate?: string;
  grossSalary: number;
  netSalary: number;
  benefits: string[];
  documents: {
    id: number;
    name: string;
    url: string;
    type: string;
  }[];
}

// Payslip interface
export interface Payslip {
  id: number;
  employeeId: number;
  month: number;
  year: number;
  grossAmount: number;
  netAmount: number;
  taxAmount: number;
  deductions: {
    name: string;
    amount: number;
  }[];
  additions: {
    name: string;
    amount: number;
  }[];
  documentUrl: string;
  status: 'draft' | 'sent' | 'paid';
}

// Work Schedule interface
export interface WorkSchedule {
  id: number;
  employeeId: number;
  date: string;
  startTime: string;
  endTime: string;
  type: 'regular' | 'overtime' | 'oncall';
}

// Leave Request interface
export interface LeaveRequest {
  id: number;
  employeeId: number;
  type: 'annual' | 'sick' | 'family' | 'unpaid' | 'other';
  startDate: string;
  endDate: string;
  halfDay?: boolean;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: number;
  approvedAt?: string;
}

// Performance Review interface
export interface PerformanceReview {
  id: number;
  employeeId: number;
  reviewerId: number;
  date: string;
  period: {
    start: string;
    end: string;
  };
  objectives: {
    id: number;
    description: string;
    achievement: number; // 0-100%
    comments: string;
  }[];
  competencies: {
    id: number;
    name: string;
    rating: number; // 1-5
    comments: string;
  }[];
  strengths: string[];
  improvements: string[];
  overallRating: number; // 1-5
  comments: string;
  status: 'draft' | 'finalized' | 'acknowledged';
}
