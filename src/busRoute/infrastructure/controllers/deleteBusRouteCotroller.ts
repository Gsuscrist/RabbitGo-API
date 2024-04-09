import {Request,Response} from "express";
import {DeleteBusRouteUseCase} from "../../application/useCase/deleteBusRouteUseCase";

export class DeleteBusRouteCotroller{
    constructor(readonly useCase:DeleteBusRouteUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let uuid = req.params.uuid
            await this.useCase.run(uuid)
            res.status(204).send(
                {
                    status:"success",
                    data:[],
                    message:"bus route deletion successfully"
                }
            )
        }catch (e){
            console.log("controller:\n", e)
            res.status(417).send({
                message:"error",
                error:e
            })
        }
    }
}