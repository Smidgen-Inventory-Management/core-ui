'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';



import { Dispatch, SetStateAction, useEffect } from 'react';



import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Equipment, EquipmentStatus } from '@/types/equipment';
import { FormSchema } from '@/types/formSchemas';


/*
 * Smidgen
 *
 * Core UI for interfacing with Smidgen.
 *
 *   Smidgen aims to simplify and automate common tasks that logisticians
 *   conduct on a daily basis so they can focus on the effective distribution
 *   of materiel, as well as maintain an accurate record keeping book of
 *   receiving, issuance, audits, surpluses, amongst other logistical tasks.
 *   Copyright (C) 2024  Jose Hernandez
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
  { name: 'status_id', label: 'Status', type: 'Select' },
  { name: 'manufacturer_id', label: 'Manufacturer ID', type: 'number', min: 1 },
  { name: 'model', label: 'Model', type: 'text' },
  { name: 'description', label: 'Description', type: 'text' }
]

export function InputForm({ setIsSheetOpen, onSubmit, defaultValues }: FormProps) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      business_unit_id: defaultValues.business_unit_id,
      manufacturer_id: defaultValues.manufacturer_id,
      model: defaultValues.model,
      status_id: defaultValues.status_id,
      description: defaultValues.description || ''
    }
  })

  useEffect(() => {
    form.setValue('status_id', String(defaultValues.status_id) || String(EquipmentStatus.unknown))
      console.log('def values:')
      console.log(defaultValues)
  }, [form, defaultValues.status_id])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
        {formFields.map(({ name, label, type, min, description }) => {
          switch (type.toLowerCase()) {
            case 'number':
            case 'text':
              return (
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
              )
            case 'select':
              return (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ? String(field.value) : 'Unknown'}
                      >
                        <SelectTrigger className='w-[180px]'>
                          <SelectValue placeholder='Unknown' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='1'>Deployable</SelectItem>
                          <SelectItem value='2'>Not Deployable</SelectItem>
                          <SelectItem value='3'>Maintenance</SelectItem>
                          <SelectItem value='4'>Surplussed</SelectItem>
                          <SelectItem value='5'>Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
          }
        })}
        <Button type='reset' variant='outline' onClick={() => setIsSheetOpen(false)}>
          Cancel
        </Button>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}