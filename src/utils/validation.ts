import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .default(''),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.string()
    .min(1, 'Category is required')
    .max(50, 'Category must be less than 50 characters'),
  dueDate: z.string()
    .refine((date) => {
      if (!date) return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(date) >= today;
    }, 'Due date cannot be in the past'),
});

export type TodoFormData = z.infer<typeof todoSchema>;