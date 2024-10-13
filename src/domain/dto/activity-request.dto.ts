import { z } from 'zod';

export const ActivityRequestDtoSchema = z.object({
    title: z.string().min(1).max(250),
    estimate_time: z.number().min(0).optional(),
    description: z.string(),
    active: z.boolean().default(true).optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    deleted_at: z.string().optional(),
    tags: z.array(z.string()).min(1),
});

export type ActivityRequestDtoType = z.infer<typeof ActivityRequestDtoSchema>;
