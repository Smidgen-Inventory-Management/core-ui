import { Equipment } from '@/types/equipment';


export function getEquipment(): Promise<Equipment[] | null> {
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
      if (typeof res === 'string') return null
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
export function updateEquipment(id: number, data: Equipment): Promise<number> {
  const getCurrentDate = (): string => {
    const now = new Date()
    return now.toISOString()
  }

  const body: {
    equipment_id: number
    date_received: string
    last_inventoried: string
    business_unit_id: number
    manufacturer_id: number
    model: string
    status_id: number
    description: string
  } = {
    equipment_id: data.equipment_id,
    date_received: data.date_received,
    last_inventoried: getCurrentDate(),
    business_unit_id: data.business_unit_id,
    manufacturer_id: data.manufacturer_id,
    model: data.model,
    status_id: parseInt(data.status_id),
    description: data.description ? data.description : ''
  }
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`http://localhost:8050/api/v1/equipment/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: headers,
    body: JSON.stringify(body)
  })
  const status = fetch(request)
    .then((res) => res.status)
    .then((res) => {
      return res
    })
  return status
}