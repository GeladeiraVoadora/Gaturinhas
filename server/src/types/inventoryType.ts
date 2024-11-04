import { Prisma } from "@prisma/client";

// Defina o tipo para incluir `gat_prod`
export type Inventory = Prisma.inventarioGetPayload<{
  include: {
    gat_prod: {
      select: {
        prodId: true;
        gat: {
          select: { name: true; image: true }
        }
      }
    }
  }
}>;
