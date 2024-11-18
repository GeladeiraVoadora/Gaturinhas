import { PrismaClient } from "@prisma/client";
import { ICemiterioService } from "./interfaces/ICemiterioService";

const prisma = new PrismaClient();

export class CemiterioService implements ICemiterioService {
    createGatinhoFalecido(userId: number, data: any): Promise<{ msg?: string; error?: string; }> {
        throw new Error("Method not implemented.");
    }
    addToCemiterio(gatId: number): Promise<boolean | { error: string; }> {
        throw new Error("Method not implemented.");
    }
    removeToCemiterio(gatId: number): Promise<boolean | { error: string; }> {
        throw new Error("Method not implemented.");
    }
}