import {Request,Response} from "express";
import {GetBusStopUseCase} from "../../application/useCase/getBusStopUseCase";


export class GetBusStopController{
    constructor(readonly usecase:GetBusStopUseCase) {
    }

    async runById(req:Request,res:Response){
        try {
            let uuid = req.params.uuid
            const busStop = await this.usecase.runByUuid(uuid)
            if (busStop){
                return res.status(200).send({
                    status:"success",
                    data:busStop,
                    message:"bus stop got successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"bus stop got failed "
            })
        }catch (e) {
            console.log("controller:\n",e)
            res.status(417).send({
                message:"error",
                error: e
            })
        }
    }

    async run(req:Request,res:Response){
        try {
            const busStops = await this.usecase.run()

            if (busStops){
                return res.status(200).send({
                    status:"success",
                    data:busStops,
                    message:"bus stop got successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"bus stop got failed"
            })
        }catch (e) {
            console.log(e)
            res.status(417).send({
                message:"error",
                error:e
            })
        }
    }
}