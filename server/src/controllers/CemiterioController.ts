import { ICemiterioService } from "../services/interfaces/ICemiterioService";

export default class CemiterioController{
    constructor(private readonly cemiterioService: ICemiterioService) {}

    async removeToCemiterio(req: any, res: any){
        try{
            const {facelidoId} = req.body;
            console.log(facelidoId)
            const result = await this.cemiterioService.removeToCemiterio(facelidoId);
            if (typeof result === "boolean" && result === true) {
                return res.json(true);
              }
        }catch(error){
            return res.json({error});
        }
    }

    async findAllGatinhosFalecidos(req: any, res: any){
        try {
            const {userId} = req.params;
            const result = await this.cemiterioService.findAllGatinhosFalecidos(Number(userId));
            return res.json(result)
        } catch (error) {
            return res.json({error});
        }
    }
}