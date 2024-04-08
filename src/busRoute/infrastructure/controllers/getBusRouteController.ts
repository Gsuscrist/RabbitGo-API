import {Request,Response} from "express";
import {GetBusRouteUseCase} from "../../application/useCase/getBusRouteUseCase";

export class GetBusRouteController {
    constructor(readonly useCase:GetBusRouteUseCase) {
    }

    async runByUuid(req:Request,res:Response){
        try {
            let uuid = req.params.uuid
            const busRoute =  await this.useCase.runByUuid(uuid)
            if (busRoute){
                return res.status(200).send({
                    status:"success",
                    data: busRoute,
                    message: "bus route get successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"bus route get failed"
            })
        }catch (e){
            console.log("controller:\n", e)
            res.status(417).send({
                message:"error",
                error:e
            })
        }
    }


}