import { inventario } from "@prisma/client";

export interface IInventoryService {
  findInventoryById(invId: number): Promise<inventario | null>;
}
