import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must contain at least 2 characters")
        .max(100, "Name cannot exceed 100 characters"),

    email: z
        .string()
        .trim()
        .email("Please provide a valid email address")
        .max(150, "Email cannot exceed 150 characters"),

    password: z
        .string()
        .min(8, "Password must contain at least 8 characters")
        .max(72, "Password cannot exceed 72 characters"),
});