import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'tags' | 'subtasks'>) => {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      tags: [],
      subtasks: [],
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const addSubtask = (todoId: string, subtask: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: [...todo.subtasks, { id: crypto.randomUUID(), text: subtask, completed: false }],
            }
          : todo
      )
    );
  };

  const toggleSubtask = (todoId: string, subtaskId: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map(subtask =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : todo
      )
    );
  };

  const addTag = (todoId: string, tag: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === todoId
          ? { ...todo, tags: [...new Set([...todo.tags, tag])] }
          : todo
      )
    );
  };

  const removeTag = (todoId: string, tag: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === todoId
          ? { ...todo, tags: todo.tags.filter(t => t !== tag) }
          : todo
      )
    );
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    addSubtask,
    toggleSubtask,
    addTag,
    removeTag,
  };
}