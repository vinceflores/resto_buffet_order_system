import { Table } from '@prisma/client';

export class CreateTableDTO {
  restaurantId: string;
  table: Partial<Table>;
}
