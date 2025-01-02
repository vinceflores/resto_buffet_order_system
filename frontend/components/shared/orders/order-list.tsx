"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type Order = {
    id: string
    status: string
    tableNumber: number
    items: string[]
    total: number
    time: string
}

type OrderListProps = {
    orders: Order[]
    onSelectOrder: (order: Order) => void
}

export function OrderList({ orders, onSelectOrder }: OrderListProps) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders?.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>{order.tableNumber}</TableCell>
                        <TableCell>{order.items.join(", ")}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>{new Date(order.time).toISOString()}</TableCell>
                        <TableCell >
                            <Button variant="outline" size="sm" onClick={() => onSelectOrder(order)}>
                                View Details
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

