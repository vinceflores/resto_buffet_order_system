"use client";

import { MenuSchemaType } from "@/components/shared/menu/add-menu-item-form";
import {
  MenuForm,
  MenuFormSchemaType,
} from "@/components/shared/menu/menu-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { PlusCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { create, update } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateRestaurantForm from "@/components/shared/restaurant/restaurant-form";

export default function MenusPage() {
  const { id } = useParams();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRestaurant, setSelectedR] =
    useState<MenuFormSchemaType | null>(null);
  const [data, setData] = useState<MenuFormSchemaType[]>([]);

  const onSubmit = async (restaurantId: string, data: MenuFormSchemaType) => {
    // console.log({ restaurantId, data });
    await create(restaurantId, data);
  };
  const submitEdit = async (restaurantId: string, data: MenuFormSchemaType) => {
    await update(data.id!, data);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Menus</h1>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Restaurant
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full min-h-screen overflow-scroll">
            <SheetHeader>
              <SheetTitle>Create new Restaurant</SheetTitle>
              <SheetDescription>
                Fill in the details to add a new item to your menu.
              </SheetDescription>
            </SheetHeader>
            <MenuForm restaurantId={id as string} onSubmit={onSubmit} />
          </SheetContent>
        </Sheet>
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="capitalize">
              {/* {selectedRestaurant?.name} */}
            </DialogTitle>
          </DialogHeader>

          <MenuForm
            defaultValues={{
              name: "",
              description: "",
              restaurantId: id as string,
              imageUrl: "",
            }}
            restaurantId={id as string}
            onSubmit={submitEdit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
