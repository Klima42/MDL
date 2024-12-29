import React from 'react';

interface TodoCategoryProps {
  category: string;
}

export function TodoCategory({ category }: TodoCategoryProps) {
  return (
    <span className="px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
      {category}
    </span>
  );
}