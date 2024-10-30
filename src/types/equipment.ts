export type EquipmentStatus = 'Deployable' | 'Not Deployable' | 'Maintenance' | 'Surplussed' | 'Unknown'

export type Equipment = {
  equipment_id: number
  business_unit_id: number
  manufacturer: string
  model: string
  description?: string
  status: EquipmentStatus
  date_received: string
  last_inventoried: string
}

export type EquipmentPartial = {
  business_unit_id: number
  manufacturer: string
  model: string
  status: string
  description?: string
}
