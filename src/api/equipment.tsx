export type Equipment = {
  id: number
  BusinessUnitID: string
  Manufacturer: string
  Model: string
  Description: string
  Status: 'Deployable' | 'Not Deployable' | 'Maintenance' | 'Surplussed' | 'Unknown'
  DateReceived: string
  LastInventoried: string
}

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
    .then((res) => res.json())
    .then((res) => {
      return res as Equipment[]
    })
}

export function deleteEquipment(id: number): Promise<number> {
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
