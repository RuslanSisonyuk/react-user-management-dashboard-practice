import { z } from "zod";

export const userRoles = z.enum(["Viewer","Editor","Admin"],{
  message: "Select a role"
})

export const userSchema = z.object({
  id: z.string().uuid("Invalid UUID"),
  name: z.string().min(2, {
    message: "Name must have at least 2 characters"
  }),
  email: z.string().email({
    message: "Enter a valid email address"
  }),
  role: userRoles,
})

export type user = z.infer<typeof userSchema>