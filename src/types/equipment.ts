export type Equipment = {
  equipment_id: number
  business_unit_id: number
  manufacturer: string
  model: string
  description?: string
  status?: 'Deployable' | 'Not Deployable' | 'Maintenance' | 'Surplussed' | 'Unknown'
  date_received: string
  last_inventoried: string
}

export type EquipmentPartial = { business_unit_id: number; manufacturer: string; model: string; description?: string }
