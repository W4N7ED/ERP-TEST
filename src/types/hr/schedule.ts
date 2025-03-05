
export interface EmployeeSchedule {
  id: number;
  employeeId: number;
  weekStartDate: string; // ISO date for the start of the week
  shifts: Shift[];
  totalHours: number;
  status: 'pending' | 'approved' | 'completed';
}

export interface Shift {
  id: number;
  scheduleId: number;
  date: string; // ISO date string
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  breakDuration: number; // In minutes
  taskType: 'regular' | 'intervention' | 'project' | 'meeting' | 'training';
  taskReference?: number; // ID of related intervention, project, etc.
  location?: string;
  notes?: string;
}

export interface TimeEntry {
  id: number;
  employeeId: number;
  shiftId?: number; // Optional link to planned shift
  date: string; // ISO date string
  clockIn: string; // HH:MM format
  clockOut: string; // HH:MM format
  breakDuration: number; // In minutes
  totalHours: number;
  overtimeHours: number;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}
