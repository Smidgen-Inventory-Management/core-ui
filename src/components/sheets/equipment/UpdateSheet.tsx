import { Row } from '@tanstack/react-table'
import { SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import { Dispatch, SetStateAction } from 'react'

import { InputForm } from '@/components/forms/quick-edit-equipment'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Equipment } from '@/types/equipment'
import { FormSchema } from '@/types/formSchemas'

interface UpdateSheetProps {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  row: Row<Equipment>
  onSubmit: SubmitHandler<z.infer<typeof FormSchema>>
}

const UpdateSheet = ({ isOpen, onClose, row, onSubmit }: UpdateSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifying Equipment {row.getValue('equipment_id')}</SheetTitle>
        </SheetHeader>
        <InputForm setIsSheetOpen={onClose} onSubmit={onSubmit} defaultValues={row.original} />
      </SheetContent>
    </Sheet>
  )
}

export default UpdateSheet
