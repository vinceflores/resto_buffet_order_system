"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Order = {
    id: string
    status: string
    tableNumber: number
    items: string[]
    total: number
    time: string
}

type OrderDetailsProps = {
    order: Order | null
    onUpdateStatus: (newStatus: string) => void
}

export function OrderDetails({ order, onUpdateStatus }: OrderDetailsProps) {
    if (!order) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Select an order to view details</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order #{order.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold">Status</h3>
                    <p className="capitalize">{order.status}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Table Number</h3>
                    <p>{order.tableNumber}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Items</h3>
                    <ul className="list-disc list-inside">
                        {order.items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Total</h3>
                    <p>${order.total.toFixed(2)}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Time Placed</h3>
                    <p>{new Date(order.time).toLocaleString()}</p>
                </div>
            </CardContent>
            <CardFooter>
                <Select onValueChange={onUpdateStatus} defaultValue={order.status}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </CardFooter>
        </Card>
    )
}

