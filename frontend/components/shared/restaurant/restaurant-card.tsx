"use effect";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type RestaurantCardProps = {
  name: string;
  coverImage: string;
  onClick: () => void;
};
const RestaurantCard = (props: RestaurantCardProps) => {
  const { name, coverImage, onClick } = props;

  return (
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
      </CardHeader>
      <CardContent className="rounded-t-xl p-2"></CardContent>
      <CardFooter> </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
