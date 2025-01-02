"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { AddTableForm } from "@/components/shared/table/add-table-form";
import { useParams } from "next/navigation";
import { AdminParam } from "../paramType";
const tables = [
  {
    id: 1,
    name: "Table 1",
    seats: 4,
    seated: 0,
    total: 0,
    status: "Available",
  },
  {
    id: 2,
    name: "Table 2",
    seats: 2,
    seated: 2,
    total: 45.5,
    status: "Occupied",
  },
  { id: 3, name: "Table 3", seats: 6, seated: 0, total: 0, status: "Reserved" },
  {
    id: 4,
    name: "Table 4",
    seats: 4,
    seated: 0,
    total: 0,
    status: "Available",
  },
  { id: 5, name: "Table 5", seats: 8, seated: 0, total: 0, status: "Reserved" },
  {
    id: 6,
    name: "Table 6",
    seats: 2,
    seated: 2,
    total: 32.75,
    status: "Occupied",
  },
];

export default function TablesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { id } = useParams<AdminParam>();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tables Management</h1>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Table
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Table</SheetTitle>
              <SheetDescription>
                Fill in the details to add a new table to your restaurant.
              </SheetDescription>
            </SheetHeader>
            <AddTableForm onSuccess={() => setIsSheetOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tables.map((table) => (
          <Card key={table.id}>
            <CardHeader>
              <CardTitle>{table.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Seats: {table.seats}</p>
              <p className="text-sm text-gray-600">Seated: {table.seated}</p>
              <p className="text-sm text-gray-600">
                Total: ${table.total.toFixed(2)}
              </p>
              <Badge
                className="mt-2"
                variant={
                  table.status === "Available"
                    ? "outline"
                    : table.status === "Occupied"
                    ? "destructive"
                    : "default"
                }
              >
                {table.status}
              </Badge>
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
  );
}
