"use server";
import { env } from "@/lib/env";

async function getMenus() {
  const id = "";
  const res = await fetch(env.baseURL + "menu/" + id, {
    method: "GeT",
    headers: { "Content-Type": "appliaction/json" },
  });
  console.log(await res.json());
}



