import { z } from 'zod';

export const enrollmentSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters").max(100, "Name is too long"),
  contact: z
    .string()
    .trim()
    .regex(/^\+?[\d\s-]{10,15}$/, "Please enter a valid phone number (10-15 digits)"),
  address: z.string().trim().min(1, "Please provide an address").max(300, "Address is too long"),
  dob: z.string().trim().min(1, "Please provide your date of birth"),
  education: z.string().trim().min(1, "Please fill in your education level").max(200, "Education field is too long"),
  course: z.string().trim().min(1, "Course name is required"),
  gender: z.string().trim().min(1, "Please select a gender"),
  courseType: z.enum(["ONLINE", "PHYSICAL"], {
    required_error: "Course type is required",
    invalid_type_error: "Invalid course type",
  }),
});