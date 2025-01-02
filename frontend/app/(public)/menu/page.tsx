import React from "react";
import { ScrollArea } from "../../components/ui/scroll-area";

function Menu() {
  return (
    <div className="">
      <h1>Desserts</h1>
      <ScrollArea className="">
        <div className="flex w-max space-x-4 p-4">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Menu;
