import {z} from 'zod'

export const createChaptersSchema= z.object({
    title : z.string().min(3).max(50),
    units: z.array(z.string()),
})
 