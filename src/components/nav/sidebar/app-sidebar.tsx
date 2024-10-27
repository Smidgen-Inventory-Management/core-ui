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
import {
  AudioWaveform,
  BookOpen,
  Shapes,
  Command,
  House,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal
} from 'lucide-react'

import * as React from 'react'

import { NavMain } from '@/components/nav/sidebar/nav-main'
import { NavUser } from '@/components/nav/sidebar/nav-user'
import { TeamSwitcher } from '@/components/nav/sidebar/team-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://ui.shadcn.com/avatars/shadcn.jpg'
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise'
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup'
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free'
    }
  ],
  navMain: [
    {
      title: 'Home',
      url: '',
      icon: House,
      isActive: true,
      items: [
        {
          title: 'Dashboard',
          url: '/'
        },
      ]
    },
    {
      title: 'Equipment',
      url: '',
      icon: Shapes,
      items: [
        {
          title: 'List All',
          url: 'equipment'
        },
      ]
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#'
        },
        {
          title: 'Get Started',
          url: '#'
        },
        {
          title: 'Tutorials',
          url: '#'
        },
        {
          title: 'Changelog',
          url: '#'
        }
      ]
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#'
        },
        {
          title: 'Team',
          url: '#'
        },
        {
          title: 'Billing',
          url: '#'
        },
        {
          title: 'Limits',
          url: '#'
        }
      ]
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail className=' h-full p-0' />
    </Sidebar>
  )
}
