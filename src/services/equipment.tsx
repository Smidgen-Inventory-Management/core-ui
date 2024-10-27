import { Equipment, EquipmentPartial } from "@/types/equipment"

export function getEquipment(): Promise<Equipment[]> {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request('http://localhost:8050/api/v1/equipment/', {
    method: 'GET',
    mode: 'cors',
    headers: headers
  })
  return fetch(request)
    .then((res) => {
      if (!res.ok) {
        return res.status
      }
      return res.json()
    })
    .then((res) => {
      return res as Equipment[]
    })
    .catch((error) => {
      console.error('Error fetching equipment:', error)
      throw error
    })
}

export function deleteEquipment(id: number): Promise<number> {
  console.log(id)
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`http://localhost:8050/api/v1/equipment/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: headers
  })
  const status = fetch(request)
    .then((res) => res.status)
    .then((res) => {
      return res
    })
  return status
}

export function updateEquipment(id: number, partialData: EquipmentPartial, receivedDate: string): Promise<number> {
  const getCurrentDate = (): string => {
    const now = new Date()
    return now.toISOString()
  }
  const data: Equipment = {
    equipment_id: id,
    business_unit_id: partialData.business_unit_id,
    manufacturer: partialData.manufacturer,
    model: partialData.model,
    description: partialData.description,
    date_received: receivedDate,
    last_inventoried: getCurrentDate()
  }
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`http://localhost:8050/api/v1/equipment/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: headers,
    body: JSON.stringify(data)
  })
  const status = fetch(request)
    .then((res) => res.status)
    .then((res) => {
      return res
    })
  return status
}
