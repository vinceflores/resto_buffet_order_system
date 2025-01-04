"use client";
import RestaurantCard from "@/components/shared/restaurant/restaurant-card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CreateRestaurantForm, {
  CreateRestaurantFormSubmitParams,
} from "@/components/shared/restaurant/restaurant-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { create, findAll, update } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRestaurant, setSelectedR] =
    useState<CreateRestaurantFormSubmitParams | null>(null);
  const [data, setData] = useState<CreateRestaurantFormSubmitParams[]>([]);

  useEffect(() => {
    const get = async () => {
      try {
        const d = await findAll();
        console.log({ datas: d });
        setData((prev) => d || prev);
      } catch (error) {}
    };
    get();
  }, []);

  const submitRestau = async (values: CreateRestaurantFormSubmitParams) => {
    await create(values);
  };

  const updateOne = async (values: CreateRestaurantFormSubmitParams) => {
    await update(values?.id as string, values);
  };

  const onEdit = (data: CreateRestaurantFormSubmitParams) => {
    setSelectedR(data);
    setOpen(!open);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Restaurants</h1>
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
            <CreateRestaurantForm onSubmit={submitRestau} />
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data &&
          data.length > 0 &&
          data.map((a: CreateRestaurantFormSubmitParams, index: number) => {
            const url = `https://picsum.photos/seed/abstract_${index}/200/100`;
            return (
              <RestaurantCard
                onEdit={onEdit}
                onClick={() => router.push(`/admin/${a.id}`)}
                resId={a.id as string}
                key={a.id}
                coverImage={url}
                name={a.name as string}
                description={a.description as string}
                data={a}
              />
            );
          })}
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="capitalize">
              {selectedRestaurant?.name}
            </DialogTitle>
          </DialogHeader>
          <CreateRestaurantForm
            onSubmit={updateOne}
            initialData={selectedRestaurant || undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
