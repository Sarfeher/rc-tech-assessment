import { z } from "zod";

// same schema for getById and delete
export const byIdSchema = z.object({
  id: z.string().min(1),
});

export const updateSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
  }),
});

export const createSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
  }),
});

//Schemas for status

export const createStatusSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    position: z.number().int().nonnegative(),
    boardId: z.string().min(1),
  }),
});

export const updateStatusSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    name: z.string().min(1),
    position: z.number().int().nonnegative(),
  }),
});