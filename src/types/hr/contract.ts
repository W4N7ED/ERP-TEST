
export type ContractType = 'CDI' | 'CDD' | 'Freelance' | 'Alternance' | 'Stage';

export interface Contract {
  id: number;
  employeeId: number;
  type: ContractType;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string (optional for indefinite contracts)
  grossSalary: number;
  netSalary: number;
  currency: 'EUR' | 'USD';
  workingHours: number; // Weekly working hours
  bonuses?: {
    name: string;
    amount: number;
    frequency: 'monthly' | 'quarterly' | 'annually' | 'one-time';
  }[];
  benefits?: string[];
  status: 'active' | 'terminated' | 'pending';
  terminationReason?: string;
  documents?: string[]; // URLs to contract documents
  history?: ContractChangeHistory[];
}

export interface ContractChangeHistory {
  id: number;
  contractId: number;
  changeDate: string; // ISO date string
  changeType: 'creation' | 'modification' | 'termination' | 'renewal';
  changes: {
    field: string;
    oldValue?: any;
    newValue: any;
  }[];
  reason?: string;
}

export interface Payslip {
  id: number;
  employeeId: number;
  contractId: number;
  period: {
    month: number; // 1-12
    year: number;
  };
  grossAmount: number;
  netAmount: number;
  deductions: {
    name: string;
    amount: number;
  }[];
  additions: {
    name: string;
    amount: number;
    type: 'bonus' | 'overtime' | 'commission' | 'other';
  }[];
  workingHours: number;
  overtimeHours: number;
  issueDate: string; // ISO date string
  status: 'draft' | 'issued' | 'paid';
  fileUrl?: string; // URL to PDF file
}
