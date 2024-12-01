import { z } from 'zod';



import { EquipmentStatus } from './equipment';


export const FormSchema = z.object({
  equipment_id: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().gt(0, {
      message: 'Equipment ID must be greater than 0'
    })
  ),
  date_received: z.string(),
  last_inventoried: z.string(),
  business_unit_id: z.preprocess(
    (val) => parseInt(val as string),
    z.number().gt(0, {
      message: 'Business unit must be greater than 0'
    })
  ),
  manufacturer_id: z.preprocess(
    (val) => parseInt(val as string),
    z.number().gt(0, {
      message: 'Business unit must be greater than 0'
    })
  ),
  model: z.string().min(2, { message: 'Model must be at least 2 characters.' }),
  status_id: z.string(),
  description: z.string().min(2, { message: 'Description must be at least 2 characters.' }).optional()
})