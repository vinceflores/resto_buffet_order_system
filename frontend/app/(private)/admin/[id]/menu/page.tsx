"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
import { AddMenuItemForm } from "@/components/shared/menu/add-menu-item-form"

const menuItems = [
    { id: 1, name: 'Margherita Pizza', category: 'Main Course', price: 12.99, image: '/placeholder.svg?height=100&width=100', isAvailable: true },
    { id: 2, name: 'Caesar Salad', category: 'Appetizer', price: 8.99, image: '/placeholder.svg?height=100&width=100', isAvailable: true },
    { id: 3, name: 'Tiramisu', category: 'Dessert', price: 6.99, image: '/placeholder.svg?height=100&width=100', isAvailable: false },
    { id: 4, name: 'Spaghetti Carbonara', category: 'Main Course', price: 14.99, image: '/placeholder.svg?height=100&width=100', isAvailable: true },
    { id: 5, name: 'Bruschetta', category: 'Appetizer', price: 7.99, image: '/placeholder.svg?height=100&width=100', isAvailable: true },
    { id: 6, name: 'Chocolate Mousse', category: 'Dessert', price: 5.99, image: '/placeholder.svg?height=100&width=100', isAvailable: true },
]

export default function MenuPage() {
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Menu Management</h1>
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Menu Item
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Add New Menu Item</SheetTitle>
                            <SheetDescription>
                                Fill in the details to add a new item to your menu.
                            </SheetDescription>
                        </SheetHeader>
                        <AddMenuItemForm onSuccess={() => setIsSheetOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {menuItems.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-4">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                                <div>
                                    <Badge>{item.category}</Badge>
                                    <p className="mt-2 text-2xl font-bold">${item.price.toFixed(2)}</p>
                                    <Badge variant={item.isAvailable ? "default" : "secondary"} className="mt-2">
                                        {item.isAvailable ? "Available" : "Unavailable"}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end space-x-2">
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" /> Edit
                            </Button>
                            <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

