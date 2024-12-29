import React from 'react';
import { CheckSquare } from 'lucide-react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { TodoStats } from './components/stats/TodoStats';
import { useTodos } from './hooks/useTodos';
import { TodoFilters as FilterTypes } from './types/todo';
import { useState } from 'react';

export function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [filters, setFilters] = useState<FilterTypes>({
    search: '',
    priority: '',
    category: '',
    status: 'all'
  });

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      todo.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesPriority = !filters.priority || todo.priority === filters.priority;
    const matchesStatus = filters.status === 'all' ||
      (filters.status === 'completed' ? todo.completed : !todo.completed);

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleFilterChange = (newFilters: Partial<FilterTypes>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center gap-2 mb-8">
          <CheckSquare size={32} className="text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900">Advanced Todo App</h1>
        </div>

        <div className="grid gap-8">
          <TodoStats todos={todos} />
          <TodoForm onSubmit={addTodo} />
          <TodoFilters filters={filters} onFilterChange={handleFilterChange} />
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}