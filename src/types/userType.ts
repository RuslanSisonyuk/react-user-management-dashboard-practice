import { z } from "zod";

// export interface user{
//     id: string;
//     name: string;
//     email: string;
//     role: string;
//   }


export const userSchema = z.object({
  id: z.string().uuid("Invalid UUID"),
  name: z.string().min(2, {
    message: "Name must have at least 2 characters"
  }),
  email: z.string().email({
    message: "Enter a valid email address"
  }),
  role: z.enum(["Viewer","Editor","Admin"],{
    message: "Select a role"
  }),
})

export type user = z.infer<typeof userSchema>