import { Sun, Moon } from 'lucide-react'
import { Routes, Route, Outlet } from 'react-router-dom'

import { AppBreadcrumb } from '@/components/nav/breadcrumb/app-breadcrumb'
import { AppSidebar } from '@/components/nav/sidebar/app-sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { DashboardPage } from '@/pages/dashboard'
import { DataPage } from '@/pages/equipmentList'

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

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path='equipment' element={<DataPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

function Layout() {
  const { setTheme } = useTheme()

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <Toaster />
        <header className='flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='ml-5' />
          <Separator className='mr-2 h-4' orientation='vertical' decorative={false} />
          <AppBreadcrumb />
        </header>
        <div className='w-[93vw] ml-10'>
          <Outlet />
        </div>
        <DropdownMenu >
          <DropdownMenuTrigger asChild className='absolute bottom-5 right-0'>
            <Button variant='outline' size='icon'>
              <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
