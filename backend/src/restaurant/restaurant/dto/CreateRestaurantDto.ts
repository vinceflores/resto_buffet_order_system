import { Address, Table } from '@prisma/client';

export class CreateRestaurantDto {
  // Add custom DTO properties here
  clerkId?: string;
  name: string;
  maxTables: number;
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
}
