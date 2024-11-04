import { PrismaClient, inventario } from "@prisma/client";
import { IInventoryService } from "./interfaces/IInventoryService";

const prisma = new PrismaClient();

export class InventoryService implements IInventoryService {
  async findInventoryById(invId: number): Promise<inventario | null> {
    return await prisma.inventario.findUnique({
      where: { invId },
      include: {
        gat_prod: {
          select: {
            prodId: true,
            gat: {
              select: { name: true, image: true }
            }
          }
        }
      }
    });
  }
}