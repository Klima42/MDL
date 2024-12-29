export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: string;
  createdAt: string;
  tags: string[];
  subtasks: Subtask[];
}

export interface TodoFilters {
  search: string;
  priority: string;
  category: string;
  status: 'all' | 'active' | 'completed';
}