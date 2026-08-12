import { z } from "zod";

export const todoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .refine(val => val.replace(/\s/g, "").length >= 5, {
      message: "Title must contain at least 5 letters."
    }),
  author: z.string().min(1, "Author is required.")
});

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .refine(val => val.replace(/\s/g, "").length >= 5, {
      message: "Title must contain at least 5 letters."
    }),
  author: z.string().min(1, "Author is required."),
  body: z
    .string()
    .trim()
    .min(1, "Body is required")
    .refine(val => val.replace(/\s/g, "").length >= 20, {
      message: "Body must contain at least 20 letters."
    })
});
