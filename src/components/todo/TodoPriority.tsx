import React from 'react';

interface TodoPriorityProps {
  priority: 'low' | 'medium' | 'high';
}

export function TodoPriority({ priority }: TodoPriorityProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(priority)}`}>
      {priority}
    </span>
  );
}