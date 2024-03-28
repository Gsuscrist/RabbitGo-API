import {Request,Response} from "express";
import {CreateBusStopUseCase} from "../../application/useCase/createBusStopUseCase";
import {GenerateUuidBusStopUseCase} from "../../application/useCase/generateUuidBusStopUseCase";

export class CreateBusStopController{

    constructor(readonly usecase:CreateBusStopUseCase,readonly generateUuid:GenerateUuidBusStopUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let {name,latitude,longitude} = req.body
            let uuid = await this.generateUuid.run(name)
            const busStop= await this.usecase.run(uuid,name,latitude,longitude)
            if (busStop){
                return res.status(201).send({
                    status:"success",
                    data:busStop,
                    message:"bus stop creation successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"bus stop creation failed"
            })

        }catch (e) {
            console.log("controller:\n",e)
            res.status(417).send({
                message:"error",
                error:e,

            })
        }
    }

}