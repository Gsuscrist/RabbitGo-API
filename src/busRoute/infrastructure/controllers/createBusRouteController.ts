import {Request, Response} from "express";

import {CreateBusRouteUseCase} from "../../application/useCase/createBusRouteUseCase";
import {GenerateUuidBusRouteUseCase} from "../../application/useCase/generateUuidBusRouteUseCase";

export class CreateBusRouteController{
    constructor(readonly useCase:CreateBusRouteUseCase, readonly uuid:GenerateUuidBusRouteUseCase) {
    }

    async run(req:Request, res:Response){
        try {
            let {name,price,startTime,endTime, busStopId} = req.body
            let uuid = await this.uuid.run(name)
            const createdBusRoute = await this.useCase.run(uuid,name,price,startTime,endTime, busStopId)
            if (createdBusRoute){
                return res.status(201).send({
                    status:"successful",
                    data: createdBusRoute,
                    message:"bus route created successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"bus route creation failed"
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