"use client"

import { z } from "zod"

const emailSchema = z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address.")
    .transform((value) => value.toLowerCase())

const userNameSchema = z
    .string()
    .trim()
    .min(1, "Username is required.")
    .max(50, "Username must be 50 characters or fewer.")
    .regex(/^[a-zA-Z0-9._-]+$/, "Username can only contain letters, numbers, dots, underscores, and hyphens.")

const firstNameSchema = z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(50, "First name must be 50 characters or fewer.")

const lastNameSchema = z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(50, "Last name must be 50 characters or fewer.")

const passwordSchema = z
    .string()
    .min(8, "Use at least 8 characters.")
    .max(72, "Password must be 72 characters or fewer.")
    .regex(/[a-z]/, "Include at least one lowercase letter.")
    .regex(/[A-Z]/, "Include at least one uppercase letter.")
    .regex(/\d/, "Include at least one number.")
    .regex(/[^A-Za-z0-9]/, "Include at least one symbol.")

export const persistedUserSchema = z.object({
    email: emailSchema,
    userName: userNameSchema,
    password: z.string().min(1),
})

export const userSchema = persistedUserSchema.omit({ password: true })

export const storedAuthSchema = z.object({
    user: userSchema,
    token: z.string().min(1),
})

export const storedUsersSchema = z.array(persistedUserSchema)

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required."),
})

export const registerCredentialsSchema = z.object({
    userName: userNameSchema,
    email: emailSchema,
    password: passwordSchema,
})

export const registerSchema = registerCredentialsSchema
    .extend({
        confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match.",
    })

export const passwordRequirementLabels = [
    "8+ characters",
    "Uppercase letter",
    "Lowercase letter",
    "Number",
    "Symbol",
] as const

export const getPasswordRequirementState = (password: string) => [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
]

export type User = z.infer<typeof userSchema>
export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
