import { z } from 'zod';

export const enrollmentSchema = z.object({
  name: z.string().min(3, "Name is required"),
  contact: z
    .string()
    .regex(/^\d{10,}$/, "Phone number must be at least 10 digits"),
  address: z.string().nonempty("Please provide a address"),
  dob: z.string().nonempty("Please provide you date of birth"),
  education: z.string().nonempty("Please fill in you educaton level"),
  course: z.string().nonempty("Course name is required"),
  gender: z.string().nonempty("Please Select a Gender"),
  courseType: z.enum(["ONLINE", "PHYSICAL"], {
    required_error: "Course type is required",
    invalid_type_error: "Invalid course type",
  }),
});