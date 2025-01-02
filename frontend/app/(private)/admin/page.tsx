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
  // CreateRestauSchema,
  CreateRestaurantFormSubmitParams,
} from "@/components/shared/restaurant/restaurant-form";

import { seededRandomNumberGenerator } from "@/utils/random";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { create } from "./actions";

export default function DashboardPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();
  const arr = [1, 2, 3, 4];
  const submitRestau = async (values: CreateRestaurantFormSubmitParams) => {
    await create(values);
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
        {arr.map((a) => {
          // const rand = Math.floor(Math.random() * 1000); // Generate a random number
          const rand = seededRandomNumberGenerator(1000)(1, 20);
          // const rand = 1
          const url = `https://picsum.photos/seed/abstract_${rand}/200/100`;
          return (
            <RestaurantCard
              onClick={() => router.push(`/admin/${a}`)}
              coverImage={url}
              key={a}
              name="resto 1"
            />
          );
        })}
      </div>
    </div>
  );
}
