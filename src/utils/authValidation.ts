import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(150, "Username must be at most 150 characters")
    .regex(/^[\w.@+-]+$/, "Username can contain letters, digits, @/./+/-/_ only"),
  email: z.string().email("Enter a valid email").max(254, "Email must be at most 254 characters"),
  password: z.string().min(6, "Password must be at least 6 characters").max(128, "Password must be at most 128 characters"),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const emailSchema = z.object({
  recipient: z.string().email("Enter a valid email").max(254, "Email must be at most 254 characters"),
  subject: z.string().min(1, "Subject is required").max(255, "Subject must be at most 255 characters"),
  message: z.string().min(1, "Message is required").max(5000, "Message must be at most 5000 characters"),
});
