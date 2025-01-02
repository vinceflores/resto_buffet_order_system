"use server";
import { api } from "@/lib/api";
// import { auth } from "@clerk/nextjs/server";
import { auth } from "@/utils/auth";
import { z } from "zod";
import { CreateRestauSchema } from "@/components/shared/restaurant/restaurant-form";

const base_endpoint = "/restaurant";
export type CreateRestaurantParams = z.infer<CreateRestauSchema>;

export async function create(data: CreateRestaurantParams) {
  const { userId } = await auth();
  if (!userId) return null;
  const res = await api.post(base_endpoint, { ...data, clerkId: userId });
  if (!res) return false;
  return true;
}

export async function findAll(skip = 0, take = 10) {
  return await api.get(`${base_endpoint}?skip=${skip}&take=${take}`);
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
