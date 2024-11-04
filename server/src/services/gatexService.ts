import { PrismaClient, gaturinha } from "@prisma/client";
import { IGatexService } from "./interfaces/IGatexService";

const prisma = new PrismaClient();

export class GatexService implements IGatexService {
  async findAll(): Promise<gaturinha[]> {
    return await prisma.gaturinha.findMany();
  }
}