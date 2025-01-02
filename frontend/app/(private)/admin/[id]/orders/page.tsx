"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrderList } from "@/components/shared/orders/order-list"
import { OrderDetails } from "@/components/shared/orders/order-details"


// Mock data for demonstration
const mockOrders = [
    { id: "1", status: "pending", tableNumber: 5, items: ["Margherita Pizza", "Coke"], total: 15.99, time: "2023-06-10T14:30:00Z" },
    { id: "2", status: "in-progress", tableNumber: 3, items: ["Chicken Pasta", "Garlic Bread", "Water"], total: 22.50, time: "2023-06-10T14:35:00Z" },
    { id: "3", status: "completed", tableNumber: 7, items: ["Caesar Salad", "Iced Tea"], total: 12.99, time: "2023-06-10T14:15:00Z" },
    // Add more mock orders as needed
]

export default function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterValue, setFilterValue] = useState("all")
    const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null)

    const filteredOrders = mockOrders.filter(order =>
        (filterValue === "all" || order.status === filterValue) &&
        (order.id.includes(searchTerm) || order.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase())))
    )

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Orders Management</h1>

            <div className="space-y-4 mb-6">
                <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                />
                <Select value={filterValue} onValueChange={setFilterValue}>
                    <SelectTrigger className="w-full" >
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Orders</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex space-x-6">
                <div className="w-3/4">
                    <Tabs defaultValue="all">
                        <TabsList>
                            <TabsTrigger value="all">All Orders</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                            <OrderList orders={filteredOrders} onSelectOrder={setSelectedOrder} />
                        </TabsContent>
                        <TabsContent value="pending">
                            <OrderList orders={filteredOrders.filter(order => order.status === "pending")} onSelectOrder={setSelectedOrder} />
                        </TabsContent>
                        <TabsContent value="in-progress">
                            <OrderList orders={filteredOrders.filter(order => order.status === "in-progress")} onSelectOrder={setSelectedOrder} />
                        </TabsContent>
                        <TabsContent value="completed">
                            <OrderList orders={filteredOrders.filter(order => order.status === "completed")} onSelectOrder={setSelectedOrder} />
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="w-1/4">
                    <OrderDetails order={selectedOrder} onUpdateStatus={(newStatus) => {
                        // In a real application, you would update the order status in your backend here
                        console.log(`Updating order ${selectedOrder?.id} status to ${newStatus}`)
                        // For now, we'll just update the local state
                        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null)
                    }} />
                </div>
            </div>
        </div>
    )
}

