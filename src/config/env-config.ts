import { z } from 'zod';
import 'dotenv/config'


const envSchema = z.object({
    APPLICATION_PORT: z.string(),
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASS: z.string(),
    DATABASE_NAME: z.string(),
});
  
export const env = envSchema.parse(process.env);