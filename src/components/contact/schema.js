import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string(),
    // ({message: "Invalid phone number"}),
    message: z
      .string()
      .min(10, { message: "Message is too short!" }),
  });