import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface TodoTagsProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export function TodoTags({ tags, onAddTag, onRemoveTag }: TodoTagsProps) {
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim()) {
      onAddTag(newTag.trim());
      setNewTag('');
    }
  };

  return (
    <div className="mt-2">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add tag..."
          className="flex-1 px-3 py-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="p-1 text-blue-500 hover:text-blue-700"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
          >
            {tag}
            <button
              onClick={() => onRemoveTag(tag)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}