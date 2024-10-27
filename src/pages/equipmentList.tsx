import { useEffect, useState } from 'react'

import { columns } from '@/components/table/columns'
import { DataTable } from '@/components/table/data-table'
import { getEquipment } from '@/services/equipment'
import { Equipment } from '@/types/equipment'

export function DataPage() {
  const [equipmentData, setEquipmentData] = useState<Equipment[] | null>([])

  useEffect(() => {
    const fetchEquipmentData = async () => {
      const equipment = await getEquipment()
      setEquipmentData(equipment ? equipment : null)
    }

    fetchEquipmentData()
  }, [])
  return <DataTable columns={columns} data={equipmentData} />
}
