import React, { useState } from 'react';
import { Calendar, Tag } from 'lucide-react';
import { todoSchema, TodoFormData } from '../utils/validation';
import { useFormValidation } from '../hooks/useFormValidation';

interface TodoFormProps {
  onSubmit: (todo: TodoFormData) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [formData, setFormData] = useState<TodoFormData>({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    dueDate: '',
  });

  const { errors, validate } = useFormValidation(todoSchema);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate(formData)) {
      onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: '',
        dueDate: '',
      });
    }
  };

  const handleChange = (field: keyof TodoFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <input
          type="text"
          value={formData.title}
          onChange={handleChange('title')}
          placeholder="Task title"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>
      
      <div>
        <textarea
          value={formData.description}
          onChange={handleChange('description')}
          placeholder="Description"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={3}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Tag size={16} />
            <label className="text-sm text-gray-600">Priority</label>
          </div>
          <select
            value={formData.priority}
            onChange={handleChange('priority')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.priority ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-500">{errors.priority}</p>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={16} />
            <label className="text-sm text-gray-600">Due Date</label>
          </div>
          <input
            type="date"
            value={formData.dueDate}
            onChange={handleChange('dueDate')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.dueDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <Tag size={16} />
          <label className="text-sm text-gray-600">Category</label>
        </div>
        <input
          type="text"
          value={formData.category}
          onChange={handleChange('category')}
          placeholder="Category"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-500">{errors.category}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add Task
      </button>
    </form>
  );
}