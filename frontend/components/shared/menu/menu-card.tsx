"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import  Image  from "next/image";

type Menu = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;

  restaurantId: string;

  items: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    isAvailable: boolean;
    imageUrl: string;
  }[];
};

export type MenuCardProps = {
  data: Menu;
  imageWidth?: number;
  imageHeight?: number;
  onClick: () => void | Promise<void>;
  className?: string;
  onEdit: () => void
  onDelete: () => void
};

export function MenuCard(props: MenuCardProps) {
  const { name, description, imageUrl } = props.data;
  const {onEdit, onDelete} = props
  return (
    <Card>
      <CardContent className={cn(
        props.className, 
        "w-full "
      )}>
        <Image
          width={props.imageWidth || 100}
          height={props.imageHeight || 100}
          src={imageUrl || ""}
          alt={name}
        />
        <CardHeader>
          <CardTitle className="capitalize"> {name} </CardTitle>
          <CardDescription> {description} </CardDescription>
          <div className="flex justify-end items-center">
            <Button onClick={onEdit}> Edit </Button>
            <Button variant={"destructive"} onClick={onDelete}> Delete </Button>
          </div>
        </CardHeader>
      </CardContent>
    </Card>
  );} 
}
