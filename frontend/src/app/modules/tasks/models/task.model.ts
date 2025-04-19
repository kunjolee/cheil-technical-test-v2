export interface Task {
  id: number;
  title: string;
  description?: string;
  createdDate: string;
  isCompleted: boolean;
}

export type CreateTask = Pick<Task, 'title' | 'description'>;
