"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  CreateRestaurantFormSubmitParams,
} from "./restaurant-form";

type RestaurantCardProps = {
  name: string;
  resId: string;
  description: string;
  coverImage: string;
  data?: any;
  onClick: () => void;
  onEdit: (data: CreateRestaurantFormSubmitParams) => void;
};
const RestaurantCard = (props: RestaurantCardProps) => {
  const { name, coverImage, description, onClick } = props;
  const edit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.onEdit(props.data);
  };
  return (
    <div>
      <Card onClick={onClick} className="rounded-t-xl cursor-pointer">
        <CardHeader className="p-0">
          <Image
            width={200}
            height={100}
            src={coverImage}
            className="w-full object-cover aspect-video"
            alt="image"
          />
          <CardTitle className="text-xl px-2"> {name} </CardTitle>
          <CardDescription className="line-clamp-1">
            {description}{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="rounded-t-xl p-2">
          <Button type="button" onClick={edit}>
            Edit
          </Button>
        </CardContent>
        <CardFooter> </CardFooter>
      </Card>
    </div>
  );
};

export default RestaurantCard;
