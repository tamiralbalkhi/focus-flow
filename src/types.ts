export interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: number;
  completedPomodoros: number;
  createdAt: Date;
  completedAt?: Date;
}

export interface TimerState {
  minutes: number;
  seconds: number;
  isActive: boolean;
  mode: 'work' | 'break';
}

export interface DateStats {
  completedTasks: number;
  totalPomodoros: number;
}