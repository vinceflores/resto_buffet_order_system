"use server";
import { api } from "@/lib/api";
import { auth } from "@/utils/auth";
import { CreateRestaurantFormSubmitParams } from "@/components/shared/restaurant/restaurant-form";
import { env } from "@/lib/env";
const base_endpoint = "/restaurant";

export type CreateRestaurantParams = CreateRestaurantFormSubmitParams;

export async function create(data: CreateRestaurantParams) {
  const { userId } = await auth();
  if (!userId) return null;
  const res = await api.post(base_endpoint, { ...data, clerkId: userId });
  if (!res) return false;
  return true;
}

export async function findAll(skip = 0, take = 10) {
  const { userId } = await auth();
  const data = await api.get(
    `${base_endpoint}/${userId}?skip=${skip}&take=${take}`
  );
  return data.data;
  // const data = await fetch(
  //   env.baseURL + base_endpoint + `/${userId}?skip=${skip}&take=${take}`,
  //   {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   }
  // );
  // return await data.json();
}

export async function findOne(resId: string) {
  return await api.get(`${base_endpoint}/${resId}`);
}

export async function update(
  resId: string,
  data: Partial<CreateRestaurantParams>
) {
  await api.patch(`${base_endpoint}/${resId}`, data);
}

export async function deleteRestaurant(resId: string) {
  await api.delete(`${base_endpoint}/${resId}`);
}
