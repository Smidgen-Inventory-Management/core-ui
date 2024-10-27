'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Dispatch, SetStateAction } from 'react'

import { Equipment } from '@/api/equipment'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const FormSchema = z.object({
  business_unit_id: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().gt(0, {
      message: 'Business unit must be greater than 0'
    })
  ),
  manufacturer: z.string().min(2, {
    message: 'Manufacturer must be at least 2 characters.'
  }),
  model: z.string().min(2, {
    message: 'Model must be at least 2 characters.'
  }),
  description: z.string().min(2, { message: 'Description must be at least 2 characters.' }).optional()
})

interface FormProps {
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>
  onSubmit: SubmitHandler<z.infer<typeof FormSchema>>
  defaultValues: Equipment
}

const formFields: {
  name: keyof z.infer<typeof FormSchema>
  label: string
  type: string
  min?: number
  description?: string
}[] = [
  {
    name: 'business_unit_id',
    label: 'Business Unit ID',
    type: 'number',
    min: 1,
    description: 'Business Unit to assign equipment.'
  },
  { name: 'manufacturer', label: 'Manufacturer', type: 'text' },
  { name: 'model', label: 'Model', type: 'text' },
  { name: 'description', label: 'Description', type: 'text' }
]

export function InputForm({ setIsSheetOpen, onSubmit, defaultValues }: FormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      business_unit_id: defaultValues.business_unit_id,
      manufacturer: defaultValues.manufacturer,
      model: defaultValues.model,
      description: defaultValues.description || ''
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
        {formFields.map(({ name, label, type, min, description }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input type={type} min={min} {...field} />
                </FormControl>
                {description && <FormDescription>{description}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type='reset' variant='outline' onClick={() => setIsSheetOpen(false)}>
          Cancel
        </Button>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
