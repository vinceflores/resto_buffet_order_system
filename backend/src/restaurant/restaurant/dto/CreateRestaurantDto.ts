import { Address, Table } from '@prisma/client';

export class CreateRestaurantDto {
  // Add custom DTO properties here
  name: string;
  description: string;
  maxTables: number;
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
}
