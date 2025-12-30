import { z } from "zod";

// Franchise validation
export const franchiseSchema = z.object({
  name: z
    .string()
    .min(3, "Franchise name must be at least 3 characters")
    .max(100, "Franchise name must be less than 100 characters"),
});

// Project validation
export const projectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must be less than 100 characters"),
});

// Task validation
export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Task title must be at least 3 characters")
    .max(200, "Task title must be less than 200 characters"),
});
