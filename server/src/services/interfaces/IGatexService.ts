import { gaturinha } from "@prisma/client";

export interface IGatexService {
  findAll(): Promise<gaturinha[]>;
}