"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React from "react";

interface TableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  table?: any;
  redirect?: string;
}

function TableCard(props: TableCardProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(props.redirect ? props.redirect : "/menu");
  };
  return (
    <Card className="cursor-pointer" onClick={onClick}>
      <CardContent className="flex-col  p-4 aspect-video">
        <p className="">Menu 1</p>
        <p>Status: occupied</p>
        <p>Capacity: 4 seats</p>
      </CardContent>
    </Card>
  );
}

export default TableCard;
