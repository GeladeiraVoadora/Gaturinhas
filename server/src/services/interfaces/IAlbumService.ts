import { album, usuario } from "@prisma/client";
import { AlbumType } from "../../types/albumType";

export interface IAlbumService {
  createAlbum(userId: number): Promise<album | null>;
  findAlbum(userId: number): Promise<AlbumType | null>;
  sellAlbum(userId: number): Promise<usuario | null>;
  feedCats(userId: number): Promise<void>;
  updateLastClick(userId: number, catFed: boolean): Promise<boolean>;
  // lastClick(userId: number): Promise<{ catFed: boolean } | null>;
  lastClick(userId: number): Promise<{ catFed: string | null } | null>;
  stick(userId: number, prodId: number): Promise<boolean>;
}