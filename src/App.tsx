import { Routes, Route, Outlet } from 'react-router-dom';



import { AppBreadcrumb } from '@/components/nav/breadcrumb/app-breadcrumb';
import { AppSidebar } from '@/components/nav/sidebar/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';



import { Equipment, columns } from './components/table/columns'
import { DataTable } from './components/table/data-table';


type StatusType = 'Deployable' | 'Not Deployable' | 'Maintenance' | 'Surplussed' | 'Unknown'

interface Asset {
  ID: number
  BusinessUnitID: number
  Manufacturer: string
  Model: string
  Description: string
  Status: StatusType
  DateReceived: string
  LastInventoried: string
}

function getRandomDate(): string {
  const start = new Date(2020, 0, 1).getTime()
  const end = new Date().getTime()
  const randomDate = new Date(start + Math.random() * (end - start))
  return randomDate.toISOString().split('T')[0]
}

function getRandomStatus(): StatusType {
  const statuses: StatusType[] = ['Deployable', 'Not Deployable', 'Maintenance', 'Surplussed', 'Unknown']
  return statuses[Math.floor(Math.random() * statuses.length)]
}

function generateRandomAsset(): Equipment {
  return {
    id: Math.floor(Math.random() * 1000),
    BusinessUnitID: `BusinessUnit-${Math.floor(Math.random() * 100)}`,
    Manufacturer: `Manufacturer${Math.floor(Math.random() * 10) + 1}`,
    Model: `Model${Math.floor(Math.random() * 1000)}`,
    Description: `Description of asset ${Math.floor(Math.random() * 1000)}`,
    Status: getRandomStatus(),
    DateReceived: getRandomDate(),
    LastInventoried: getRandomDate()
  }
}

function getData(): Equipment[] {
  let mockData: Equipment[] = []
  for (let index = 0; index < 100; index++) {
    mockData.push(generateRandomAsset())
  }
  return mockData
}
function App() {
  const data = getData()
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
            <>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate mollitia ad ullam inventore asperiores
              eligendi nam, harum nisi. Doloremque nobis ex laboriosam, eos tenetur labore nisi possimus vero deserunt
              obcaecati voluptatum asperiores natus ea quo sit esse blanditiis itaque amet consequuntur. Beatae unde
              explicabo incidunt modi dignissimos iure pariatur ratione dicta molestiae quae, itaque sed, quibusdam
              laborum neque accusamus nihil rerum alias, dolore laboriosam nostrum eveniet nam voluptatum. Quaerat saepe
              iure alias nesciunt? Quaerat beatae quasi soluta, dolores dolore numquam quidem dolor! Accusantium quas
              praesentium debitis! Doloremque tenetur aliquam ipsam illo repudiandae consectetur sapiente adipisci earum
              quaerat, voluptatem quia nemo.
            </>
          }
        />
        <Route path='equipment' element={<DataTable columns={columns} data={data} />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <SidebarTrigger className='ml-5' />
          <Separator className='mx-1 h-7' orientation='vertical' decorative={false} />
          <AppBreadcrumb />
        </header>
        <main className='w-full gap-4 p-4 pt-0'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App