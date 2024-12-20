import { OrderItem } from '@prisma/client';

export class CreateOrderDTO {
  resId: string;
  tableId: string;
  items: OrderItem[];
}
