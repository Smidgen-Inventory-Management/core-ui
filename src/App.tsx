import { Routes, Route, Outlet } from 'react-router-dom'

import { AppBreadcrumb } from '@/components/nav/breadcrumb/app-breadcrumb'
import { AppSidebar } from '@/components/nav/sidebar/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { DataPage } from '@/pages/equipmentList'

import { Toaster } from './components/ui/toaster'
import { DashboardPage } from './pages/dashboard'

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
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path='equipment' element={<DataPage />} />
      </Route>
    </Routes>
  )
}

function Layout() {
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
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
