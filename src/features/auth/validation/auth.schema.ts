// src/validation/auth.schema.ts
import { z } from "zod";

/**
 * Login
 */
export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

/**
 * Register
 */
export const RegisterSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, "Full name is required"),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
        "Password must contain uppercase, lowercase and number"
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type RegisterFormData = z.infer<typeof RegisterSchema>;

/**
 * Forgot Password
 */
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email"),
});

export type ForgotPasswordFormData = z.infer<
  typeof ForgotPasswordSchema
>;