"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const revenueData = [
    { name: "Mon", revenue: 1000 },
    { name: "Tue", revenue: 1200 },
    { name: "Wed", revenue: 900 },
    { name: "Thu", revenue: 1100 },
    { name: "Fri", revenue: 1500 },
    { name: "Sat", revenue: 1800 },
    { name: "Sun", revenue: 1300 },
]

const topItemsData = [
    { name: "Pizza", orders: 45 },
    { name: "Burger", orders: 32 },
    { name: "Salad", orders: 28 },
    { name: "Pasta", orders: 22 },
    { name: "Dessert", orders: 15 },
]

export function AnalyticsCharts() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="revenue">
                    <TabsList>
                        <TabsTrigger value="revenue">Daily Revenue</TabsTrigger>
                        <TabsTrigger value="top-items">Top Items</TabsTrigger>
                    </TabsList>
                    <TabsContent value="revenue">
                        <ChartContainer
                            config={{
                                revenue: {
                                    label: "Revenue",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </TabsContent>
                    <TabsContent value="top-items">
                        <ChartContainer
                            config={{
                                orders: {
                                    label: "Orders",
                                    color: "hsl(var(--chart-2))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topItemsData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="orders" fill="var(--color-orders)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

