export enum EquipmentStatus {
  deployable = 1,
  not_deployable = 2,
  maintenance = 3,
  surplussed = 4,
  unknown = 5
}
export type Equipment = {
  equipment_id: number
  business_unit_id: number
  manufacturer_id: number
  model: string
  description?: string
  status_id?: string
  date_received: string
  last_inventoried: string
}
