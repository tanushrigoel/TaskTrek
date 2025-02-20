import { create } from "zustand";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
}

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (taskId: string, newStatus: string) => void;
  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
}

export const taskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  updateTaskStatus: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    })),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  deleteTask: (taskId: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));
