import { z } from 'zod';

const requiredString = (fieldname: string) => z
  .string({ error: `${fieldname} is required` })
  .min(1, `${fieldname} is required`);

export const activitySchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    
    
    date: z.date({
        error: 'Date is required'
    }),

    location: z.object({
        venue: requiredString('Venue'),
        city: z.string().optional(),
        latitude: z.number({ error: 'Latitude is required' }),
        longitude: z.number({ error: 'Longitude is required' })  
    })
});

export type ActivitySchema = z.infer<typeof activitySchema>;