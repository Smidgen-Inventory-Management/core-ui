import { Row } from '@tanstack/react-table'

import { Dispatch, SetStateAction } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table'
import { toast } from '@/hooks/use-toast'
import { deleteEquipment } from '@/services/equipment'
import { Equipment } from '@/types/equipment'

interface SurplusSheetProps {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  row: Row<Equipment>
}

const SurplusSheet = ({ isOpen, onClose, row }: SurplusSheetProps) => {
  const handleConfirmSurplus = () => {
    deleteEquipment(row.getValue('equipment_id'))
    onClose(false)
    toast({
      title: `Equipment ID ${row.getValue('equipment_id')} has been surplussed`,
      description: '',
      duration: 1500
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently place the asset into surplus. This means that if you
            were to re-acquire it, you will have to enter it as a new piece of equipment.
          </SheetDescription>
          <Separator />
        </SheetHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Equipment ID</TableHead>
              <TableHead>Business Unit ID</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead className='text-right'>Model</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>{row.getValue('equipment_id')}</TableCell>
              <TableCell>{row.getValue('business_unit_id')}</TableCell>
              <TableCell>{row.getValue('manufacturer')}</TableCell>
              <TableCell className='text-right'>{row.getValue('model')}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className='mt-6 flex justify-end space-x-2'>
          <Button variant='outline' onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={handleConfirmSurplus}>
            Confirm Surplus
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SurplusSheet
