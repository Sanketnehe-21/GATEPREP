// src/types.ts
export type TaskCategory = 'night_deep_focus' | 'office_micro_learning' | 'weekend_war';

export interface Task {
  id: string;
  category: TaskCategory;
  title: string;
  description: string;
  pyqTarget?: number;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface WeekPlan {
  weekNumber: number;
  startDate: string;
  endDate: string;
  phaseId: number;
  title: string;
  missionObjective: string;
  syllabusFocus: string[];
  iitMadrasPivots?: string[];
  deprioritizedTopics?: string[];
  tasks: Task[];
}

export interface UserStats {
  totalPyqsSolved: number;
  targetPyqs: number;
  streakDays: number;
  lastActiveDate: string;
}

export interface AppState {
  weeks: WeekPlan[];
  stats: UserStats;
}
