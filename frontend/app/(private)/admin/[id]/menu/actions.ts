"use server";

import { MenuFormSchemaType } from "@/components/shared/menu/menu-form";
import { api } from "@/lib/api";

const BASE_ENDPOINT = "/menu";

export async function create(resId: string, data: MenuFormSchemaType) {
  const res = await api.post(BASE_ENDPOINT, data);
  if (res.data) return res.data;
  return null;
}

export async function findAll(resId: string, skip = 0, take = 10) {
  const res = await api.get(
    BASE_ENDPOINT + `/${resId}?skip=${skip}&take=${take}`
  );
  if (res.data) return res.data;
  return null;
}

export async function findaOne(menuId: string, data: MenuFormSchemaType) {
  const res = await api.get(BASE_ENDPOINT + `/${menuId}`);
  if (res.data) return res.data;
  return null;
}

export async function update(menuId: string, data: MenuFormSchemaType) {
  await api.patch(BASE_ENDPOINT + `/${menuId}`, data);
}

export async function deleteOne(menuId: string) {
  await api.delete(BASE_ENDPOINT + `/${menuId}`);
}
