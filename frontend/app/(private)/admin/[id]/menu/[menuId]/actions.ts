"use server";

import { MenuSchemaType } from "@/components/shared/menu/add-menu-item-form";
import { api } from "@/lib/api";

/**
 * For adding menu item to a menu
 */

const base_endpoint = "/menu";

export async function create(data: MenuSchemaType) {}
export async function findAll(resId: string, skip = 0, take = 10) {}
export async function findaOne(menuId: string, data: MenuSchemaType) {}
export async function update(data: MenuSchemaType) {}
export async function deleteOne(data: MenuSchemaType) {}
