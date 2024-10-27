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
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'

import { Equipment } from '@/api/equipment'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

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

      return (
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
            <DropdownMenuItem>View equipment details</DropdownMenuItem> {/* Redirects*/}
            <DropdownMenuItem>Quick Modify</DropdownMenuItem> {/* Opens a sheet*/}
            <DropdownMenuItem>Surplus Equipment</DropdownMenuItem> {/* Opens a sheet*/}
            <DropdownMenuItem>Update Equipment Inventory</DropdownMenuItem> {/* Opens a sheet*/}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
