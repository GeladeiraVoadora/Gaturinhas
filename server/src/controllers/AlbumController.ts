import { IAlbumService } from "../services/interfaces/IAlbumService";
import { AlbumType } from "../types/albumType";

export default class AlbumController {
  constructor(private albumService: IAlbumService) {}

  async createAlbum(req: any, res: any) {
    const { userId } = req.body;
    const album = await this.albumService.createAlbum(Number(userId));
    if (!album) return res.json({ error: "album já existe" });
    return res.json(true);
  }

  async findAlbum(req: any, res: any) {
    const { userId } = req.params;
    const album = await this.albumService.findAlbum(Number(userId)) as AlbumType;
  
    if (!album) return res.json(false);
  
    const gaturinhas = album.gat_prod.map((gp) => gp.gat);
    return res.json({ result: true, gaturinhas });
  }

  async sellAlbum(req: any, res: any) {
    const { userId } = req.body;
    const result = await this.albumService.sellAlbum(Number(userId));
    if (!result) return res.json({ error: "Falha na venda do album" });
    return res.json(true);
  }

  async feedCats(req: any, res: any) {
    const { userId } = req.params;
    await this.albumService.feedCats(Number(userId));
    return res.json(true);
  }

  async updateLastClick(req: any, res: any) {
    const { catFed } = req.body;
    const { userId } = req.params;
    const result = await this.albumService.updateLastClick(Number(userId), catFed);
    return res.json(result);
  }

  async lastClick(req: any, res: any) {
    const { userId } = req.params;
    const result = await this.albumService.lastClick(Number(userId));
    return res.json(result);
  }

  async stick(req: any, res: any) {
    const { userId } = req.params;
    const { prodId } = req.body;
    const result = await this.albumService.stick(Number(userId), Number(prodId));
    return res.json(result);
  }
}