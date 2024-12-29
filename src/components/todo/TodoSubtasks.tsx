import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { Subtask } from '../../types/todo';

interface TodoSubtasksProps {
  subtasks: Subtask[];
  onAddSubtask: (text: string) => void;
  onToggleSubtask: (subtaskId: string) => void;
}

export function TodoSubtasks({ subtasks, onAddSubtask, onToggleSubtask }: TodoSubtasksProps) {
  const [newSubtask, setNewSubtask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubtask.trim()) {
      onAddSubtask(newSubtask.trim());
      setNewSubtask('');
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <h4 className="text-sm font-medium text-gray-700">Subtasks</h4>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          placeholder="Add subtask..."
          className="flex-1 px-3 py-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="p-1 text-blue-500 hover:text-blue-700"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="space-y-1">
        {subtasks.map((subtask) => (
          <div
            key={subtask.id}
            className="flex items-center gap-2 text-sm"
          >
            <button
              onClick={() => onToggleSubtask(subtask.id)}
              className={`w-4 h-4 rounded border flex items-center justify-center ${
                subtask.completed
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300'
              }`}
            >
              {subtask.completed && <Check size={12} className="text-white" />}
            </button>
            <span className={subtask.completed ? 'line-through text-gray-500' : ''}>
              {subtask.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}