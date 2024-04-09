import e, {Request,Response} from "express";
import {UpdateBusRouteUseCase} from "../../application/useCase/updateBusRouteUseCase";
import {BusRoute} from "../../domain/entity/busRoute";

export class UpdateBusRouteController{
    constructor(readonly useCase:UpdateBusRouteUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let uuid = req.params.uuid
            let {name,price,startTime,endTime,busStopId} = req.body
            let busRoute = new BusRoute(uuid,name,price,startTime,endTime,busStopId,null)
            const updatedBusRoute = await this.useCase.run(uuid,busRoute)
            if (updatedBusRoute){
                return res.status(200).send({
                    status:"successfully",
                    data:updatedBusRoute,
                    message:"bus route update successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message: "bus route update failed"
            })
        }catch (e){
            console.log("controller:\n", e)
        }
    }
}