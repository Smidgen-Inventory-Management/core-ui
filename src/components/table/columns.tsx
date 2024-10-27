'use client';

import { ToastProvider } from '@radix-ui/react-toast';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { z } from 'zod';



import { useState } from 'react';



import { deleteEquipment, Equipment, updateEquipment } from '@/api/equipment';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';



import { InputForm, FormSchema } from '../forms/quick-edit-equipment';


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

export const columns: ColumnDef<Equipment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'equipment_id',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'business_unit_id',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Business Unit (ID)
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'manufacturer',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Manufacturer
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'model',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Model
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Description
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'date_received',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date Received
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'last_inventoried',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date Last Inventoried
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const equipment = row.original
      const [isSurplusSheetOpen, setIsSurplusSheetOpen] = useState<boolean>(false)
      const [isUpdateSheetOpen, setIsUpdateSheetOpen] = useState<boolean>(false)

      const handleSurplusEquipment = () => {
        setIsSurplusSheetOpen(true)
      }
      const handleUpdateEquipment = () => {
        setIsUpdateSheetOpen(true)
      }

      function onSubmit(data: z.infer<typeof FormSchema>) {
        updateEquipment(row.getValue('equipment_id'), data, row.getValue('date_received'))
        setIsUpdateSheetOpen(false)
        toast({
          title: 'You submitted the following values:',
          description: (
            <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
              <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
          duration: 1500
        })
      }
      return (
        <ToastProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(equipment.id.toString())}>
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View equipment details</DropdownMenuItem>
              <DropdownMenuItem onSelect={handleUpdateEquipment}>Quick Modify</DropdownMenuItem>
              <DropdownMenuItem onSelect={handleSurplusEquipment}>Surplus Equipment</DropdownMenuItem>
              <DropdownMenuItem>Update Equipment Inventory</DropdownMenuItem>
            </DropdownMenuContent>
            <Sheet open={isSurplusSheetOpen} onOpenChange={setIsSurplusSheetOpen}>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Are you sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently place the asset into surplus. This means that if
                    you were to re-acquire it, you will have to enter it as a new piece of equipment.
                  </SheetDescription>
                  <Separator></Separator>
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
                  <Button variant='outline' onClick={() => setIsSurplusSheetOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant='destructive'
                    onClick={() => {
                      deleteEquipment(row.getValue('equipment_id'))
                      setIsSurplusSheetOpen(false)
                      toast({
                        title: `Equipment ID ${row.getValue('equipment_id')} has been surplussed`,
                        description: '',
                        duration: 1500
                      })
                    }}
                  >
                    Confirm Surplus
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Sheet open={isUpdateSheetOpen} onOpenChange={setIsUpdateSheetOpen}>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Modifying Equipment {row.getValue('equipment_id')}</SheetTitle>
                </SheetHeader>
                <InputForm setIsSheetOpen={setIsUpdateSheetOpen} onSubmit={onSubmit} defaultValues={equipment} />
              </SheetContent>
            </Sheet>
          </DropdownMenu>
        </ToastProvider>
      )
    }
  }
]