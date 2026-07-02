import { z } from 'zod';


export const loginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string({ error: 'Password is required' }).min(6, 'Password is required')
})

export type LoginSchema = z.infer<typeof loginSchema>