import { usuario } from "@prisma/client";

export interface ICoinService {
  addMoney(userId: number, money: number): Promise<usuario | null>;
  updateLastClick(userId: number, click: Date): Promise<boolean>;
  getLastClick(userId: number): Promise<{ click: Date } | null>;
}