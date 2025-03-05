
import { UserRole } from "@/types/permissions";

export type Department = 'Technique' | 'Administration' | 'Commercial' | 'Finance' | 'Direction' | 'Support';
export type JobTitle = string;

export interface Employee {
  id: number;
  userId?: number; // Optional link to user account
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoUrl?: string;
  jobTitle: JobTitle;
  department: Department;
  role?: UserRole;
  hireDate: string; // ISO date string
  status: 'active' | 'onLeave' | 'terminated';
  address?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  notes?: string;
  documents?: EmployeeDocument[];
}

export interface EmployeeDocument {
  id: number;
  employeeId: number;
  name: string;
  type: 'contract' | 'payslip' | 'certificate' | 'other';
  fileUrl: string;
  uploadDate: string; // ISO date string
  expiryDate?: string; // ISO date string, optional
}

export interface EmployeeFilters {
  department?: Department;
  status?: Employee['status'];
  searchQuery?: string;
}
