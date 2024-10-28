import { useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

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
export function AppBreadcrumb() {
  const pathState = useLocation()
  const [currentPath, setCurrentPath] = useState<string[]>([])

  useEffect(() => {
    if (pathState.pathname === '/') {
      setCurrentPath([])
    } else {
      const newPath = pathState.pathname.split('/').filter(Boolean)
      if (newPath.join('/') !== currentPath.join('/')) {
        setCurrentPath(newPath)
      }
    }
  }, [pathState.pathname])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        {currentPath.map((pathItem, index) => {
          while (index < currentPath.length) {
            return (
              <span style={{ display: 'contents' }} key={pathItem}>
                <BreadcrumbSeparator />
                <BreadcrumbItem key={pathItem}>
                  <BreadcrumbLink href={pathItem}>
                    {String(pathItem).charAt(0).toUpperCase() + String(pathItem).slice(1)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </span>
            )
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
