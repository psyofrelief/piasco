import { z } from "zod";

export const settingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Enter a valid email"),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(8, "Min 8 characters")
    .optional()
    .or(z.literal("")),
  isOAuth: z.boolean().optional(),
});

export type SettingsValues = z.infer<typeof settingsSchema>;
