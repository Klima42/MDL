import React, { useState } from 'react';
import { Check, Trash2, Clock, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Todo } from '../../types/todo';
import { formatDate, isOverdue } from '../../utils/dateUtils';
import { TodoPriority } from './TodoPriority';
import { TodoCategory } from './TodoCategory';
import { TodoSubtasks } from './TodoSubtasks';
import { TodoTags } from './TodoTags';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddSubtask: (todoId: string, text: string) => void;
  onToggleSubtask: (todoId: string, subtaskId: string) => void;
  onAddTag: (todoId: string, tag: string) => void;
  onRemoveTag: (todoId: string, tag: string) => void;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onAddSubtask,
  onToggleSubtask,
  onAddTag,
  onRemoveTag,
}: TodoItemProps) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    onToggle(todo.id);
    // Optional: Show a brief success message
    if (!todo.completed) {
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg';
      notification.textContent = '✓ Task completed!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 2000);
    }
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md transition-all ${
        todo.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={handleToggle}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500 hover:bg-green-600'
              : 'border-gray-300 hover:border-green-500'
          }`}
          title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed && <Check size={14} className="text-white" />}
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`text-lg font-medium transition-all duration-200 ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}>
              {todo.title}
            </h3>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gray-400 hover:text-gray-600"
            >
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          
          {todo.description && (
            <p className={`text-gray-600 mt-1 ${
              todo.completed ? 'line-through' : ''
            }`}>{todo.description}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            <TodoPriority priority={todo.priority} />
            {todo.category && <TodoCategory category={todo.category} />}

            {todo.dueDate && (
              <span className={`flex items-center gap-1 text-sm ${
                isOverdue(todo.dueDate) && !todo.completed ? 'text-red-500' : 'text-gray-500'
              }`}>
                <Calendar size={14} />
                {formatDate(todo.dueDate)}
              </span>
            )}

            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Clock size={14} />
              {formatDate(todo.createdAt)}
            </span>
          </div>

          {expanded && (
            <>
              <TodoTags
                tags={todo.tags}
                onAddTag={(tag) => onAddTag(todo.id, tag)}
                onRemoveTag={(tag) => onRemoveTag(todo.id, tag)}
              />
              <TodoSubtasks
                subtasks={todo.subtasks}
                onAddSubtask={(text) => onAddSubtask(todo.id, text)}
                onToggleSubtask={(subtaskId) => onToggleSubtask(todo.id, subtaskId)}
              />
            </>
          )}
        </div>

        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
          title="Delete task"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}