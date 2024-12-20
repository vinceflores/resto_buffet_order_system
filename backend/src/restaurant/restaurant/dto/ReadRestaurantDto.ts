import { Table } from '@prisma/client';
import { Address } from 'cluster';

export class ReadRestaurantDto {
  id: string;
  name: string;
  description: string;
  phone?: string;
  email?: string;
  website?: string;
  imageUrl?: string;
  cuisine?: string;
  priceRange?: string;
  capacity?: number;
  isActive?: boolean;
  rating?: number;
  reviewCount?: number;
  location?: Address[];
  tables?: Table[];
  menu?: Table[];
}
