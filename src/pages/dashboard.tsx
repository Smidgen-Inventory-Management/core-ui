'use client'

import { Search } from 'lucide-react'
import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const description = 'A stacked area chart'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 }
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

export function DashboardPage() {
  return (
    <>
      <div className='hidden flex-col md:flex'>
        <div className='border-b'>
          <div className='flex h-16 items-center px-4'>
            <div className='ml-auto flex items-center space-x-4'>
              <Search />
            </div>
          </div>
        </div>
        <div className='flex-1 space-y-4 p-8 pt-6'>
          <div className='flex items-center justify-between space-y-2'>
            <h2 className='text-3xl font-bold tracking-tight'>Welcome, &#123;user&#125;</h2>
            <div className='flex items-center space-x-2'>
              <Button onClick={() => window.print()}>Download as Report</Button>
            </div>
          </div>
          <Tabs defaultValue='overview' className='space-y-4'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics' disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value='reports' disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value='notifications' disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value='overview' className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <Card className='col-span-4'>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className='pl-6'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque fugit unde nisi placeat voluptatum
                    incidunt error dolores velit adipisci nam voluptatibus, molestias reiciendis minus maxime mollitia,
                    voluptates vitae temporibus ducimus omnis accusamus officiis vel alias, doloribus quam. Molestias,
                    magni fuga odio harum in delectus ratione rem distinctio ex debitis atque eos architecto accusantium
                    nobis voluptas praesentium adipisci consequuntur doloribus laborum sequi reprehenderit impedit quod
                    ducimus quis? Corporis itaque maxime laudantium sed tempore dolorem, nesciunt, esse tenetur, nostrum
                    magni excepturi a! Aliquam non, deleniti explicabo repudiandae velit quis incidunt quod quidem quia.
                    Tenetur odio nesciunt dolorum quae ad ullam minima voluptas!
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>$45,231.89</div>
                    <p className='text-xs text-muted-foreground'>+20.1% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Subscriptions</CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                      <circle cx='9' cy='7' r='4' />
                      <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+2350</div>
                    <p className='text-xs text-muted-foreground'>+180.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <rect width='20' height='14' x='2' y='5' rx='2' />
                      <path d='M2 10h20' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+12,234</div>
                    <p className='text-xs text-muted-foreground'>+19% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Active Now</CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+573</div>
                    <p className='text-xs text-muted-foreground'>+201 since last hour</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Area Chart - Stacked</CardTitle>
                    <CardDescription>Showing total visitors for the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                          left: 12,
                          right: 12
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey='month'
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dot' />} />
                        <Area
                          dataKey='mobile'
                          type='natural'
                          fill='var(--color-mobile)'
                          fillOpacity={0.4}
                          stroke='var(--color-mobile)'
                          stackId='a'
                        />
                        <Area
                          dataKey='desktop'
                          type='natural'
                          fill='var(--color-desktop)'
                          fillOpacity={0.4}
                          stroke='var(--color-desktop)'
                          stackId='a'
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter>
                    <div className='flex w-full items-start gap-2 text-sm'>
                      <div className='grid gap-2'>
                        <div className='flex items-center gap-2 font-medium leading-none'>
                          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
                        </div>
                        <div className='flex items-center gap-2 leading-none text-muted-foreground'>
                          January - June 2024
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
