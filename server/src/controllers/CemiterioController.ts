import { ICemiterioService } from "../services/interfaces/ICemiterioService";

export default class CemiterioController{
    constructor(private readonly cemiterioService: ICemiterioService) {}

    async removeToCemiterio(req: any, res: any){
        try{
            const {facelidoId} = req.body;
            const result = this.cemiterioService.removeToCemiterio(facelidoId);
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
            const result = this.cemiterioService.findAllGatinhosFalecidos(userId);
            if(typeof result === "boolean" && result === true){
                return res.json(true);
            }
        } catch (error) {
            return res.json({error});
        }
    }
}