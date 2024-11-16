import { create } from 'zustand';
import { Task, TimerState } from './types';

interface Store {
  tasks: Task[];
  timer: TimerState;
  addTask: (title: string, pomodoros: number) => void;
  toggleTask: (id: string) => void;
  incrementPomodoro: (id: string) => void;
  setTimer: (timer: Partial<TimerState>) => void;
  getTasksByDate: (date: Date) => Task[];
  getCompletedTasks: () => Task[];
}

export const useStore = create<Store>((set, get) => ({
  tasks: [],
  timer: {
    minutes: 25,
    seconds: 0,
    isActive: false,
    mode: 'work',
  },
  addTask: (title, pomodoros) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: crypto.randomUUID(),
          title,
          completed: false,
          pomodoros,
          completedPomodoros: 0,
          createdAt: new Date(),
        },
      ],
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined,
            }
          : task
      ),
    })),
  incrementPomodoro: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
          : task
      ),
    })),
  setTimer: (newTimer) =>
    set((state) => ({ timer: { ...state.timer, ...newTimer } })),
  getTasksByDate: (date: Date) => {
    const { tasks } = get();
    return tasks.filter((task) => {
      const taskDate = task.completedAt || task.createdAt;
      return (
        taskDate.getFullYear() === date.getFullYear() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getDate() === date.getDate()
      );
    });
  },
  getCompletedTasks: () => {
    const { tasks } = get();
    return tasks.filter((task) => task.completed);
  },
}));