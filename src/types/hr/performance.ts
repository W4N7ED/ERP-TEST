
export interface PerformanceReview {
  id: number;
  employeeId: number;
  reviewerId: number; // User ID of the reviewer
  reviewType: 'annual' | 'quarterly' | 'probation' | 'project';
  reviewPeriod: {
    startDate: string; // ISO date string
    endDate: string; // ISO date string
  };
  scores: {
    category: string;
    score: number; // 1-5 or similar scale
    comments: string;
  }[];
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  goalsForNextPeriod: PerformanceGoal[];
  feedback?: string;
  employeeAcknowledgement?: {
    acknowledged: boolean;
    date?: string; // ISO date string
    comments?: string;
  };
  status: 'draft' | 'submitted' | 'acknowledged' | 'completed';
  date: string; // ISO date string
}

export interface PerformanceGoal {
  id: number;
  employeeId: number;
  reviewId?: number; // Optional link to a performance review
  title: string;
  description: string;
  category: 'performance' | 'development' | 'career' | 'project';
  startDate: string; // ISO date string
  dueDate: string; // ISO date string
  measures: string[];
  status: 'notStarted' | 'inProgress' | 'completed' | 'cancelled';
  progress: number; // 0-100
  checkIns: {
    date: string; // ISO date string
    notes: string;
    updatedProgress: number;
  }[];
}

export interface TrainingRecord {
  id: number;
  employeeId: number;
  name: string;
  provider: string;
  type: 'course' | 'certification' | 'workshop' | 'conference' | 'webinar';
  description?: string;
  startDate: string; // ISO date string
  completionDate?: string; // ISO date string
  duration: number; // In hours
  status: 'scheduled' | 'inProgress' | 'completed' | 'cancelled';
  result?: string;
  certificate?: string; // URL to certificate
  cost?: number;
  feedback?: string;
}
