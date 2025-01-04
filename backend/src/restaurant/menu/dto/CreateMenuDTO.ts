import { Item, Menu } from '@prisma/client';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateMenuDTO {
  @IsString()
  restaurantId: string;

  @IsOptional()
  id: string;

  @IsString()
  name: string;
  @IsString()
  description: string;

  @IsOptional()
  imageUrl: string;

  @IsArray()
  items: Omit<Item, 'id'>[];
}
