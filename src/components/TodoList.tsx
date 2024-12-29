import React from 'react';
import { Todo } from '../types/todo';
import { TodoItem } from './todo/TodoItem';
import { sortTodos } from '../utils/todoUtils';
import { useTodos } from '../hooks/useTodos';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const { addSubtask, toggleSubtask, addTag, removeTag } = useTodos();
  const sortedTodos = sortTodos(todos);
  
  return (
    <div className="space-y-4">
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onAddSubtask={addSubtask}
          onToggleSubtask={toggleSubtask}
          onAddTag={addTag}
          onRemoveTag={removeTag}
        />
      ))}
    </div>
  );
}