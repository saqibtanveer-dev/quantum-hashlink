import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: z.string().min(1, 'NEXT_PUBLIC_EMAILJS_SERVICE_ID is required'),
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: z.string().min(1, 'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID is required'),
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: z.string().min(1, 'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY is required'),
  NEXT_PUBLIC_BASE_URL: z.string().url().optional().default('http://localhost:3000'),
});

function validateEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables. Check your .env file.');
  }
  return parsed.data;
}

export const env = validateEnv();
