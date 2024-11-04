import { Prisma } from "@prisma/client";

export type AlbumType = Prisma.albumGetPayload<{
  include: {
    gat_prod: {
      include: {
        gat: {
          select: {
            name: true;
            image: true;
            type: true;
            desc: true;
          };
        };
      };
    };
  };
}>;