import { z } from "zod";


const statusEnum = z.enum(['Deployable', 'Not Deployable', 'Maintenance', 'Surplussed', 'Unknown'])

export const FormSchema = z.object({
  business_unit_id: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().gt(0, {
      message: 'Business unit must be greater than 0'
    })
  ),
  manufacturer: z.string().min(2, {
    message: 'Manufacturer must be at least 2 characters.'
  }),
  status: statusEnum,
  model: z.string().min(2, {
    message: 'Model must be at least 2 characters.'
  }),
  description: z.string().min(2, { message: 'Description must be at least 2 characters.' }).optional()
})