import React from 'react';
import { Todo } from '../../types/todo';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const overdue = todos.filter(todo => 
    !todo.completed && 
    todo.dueDate && 
    new Date(todo.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))
  ).length;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Circle size={20} />
            <span className="text-2xl font-bold">{total}</span>
          </div>
          <p className="text-sm text-gray-600">Total Tasks</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle2 size={20} />
            <span className="text-2xl font-bold">{completed}</span>
          </div>
          <p className="text-sm text-gray-600">Completed</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-red-600">
            <AlertCircle size={20} />
            <span className="text-2xl font-bold">{overdue}</span>
          </div>
          <p className="text-sm text-gray-600">Overdue</p>
        </div>
      </div>
    </div>
  );
}