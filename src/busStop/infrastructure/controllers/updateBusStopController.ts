import { UpdateBusStopUseCase } from "busStop/application/useCase/updateBusStopUseCase";
import { BusStop } from "busStop/domain/entity/busStop";
import { Request, Response } from "express";

export class UpdateBusStopController {
    constructor(readonly usecase:UpdateBusStopUseCase){}

    async run(req:Request, res:Response):Promise<BusStop|any> {
        try {
            let uuid = req.params.uuid
            let { name, latitude, longitude } = req.body
            const busStop = new BusStop (uuid,name,latitude,longitude,null)
            const updatedBusStop = await this.usecase.run(uuid,busStop)
            
            if(updatedBusStop) {
                return res.status(200).send({
                    status: "success",
                    data: updatedBusStop,
                    message : "Bus stop update successfully!"
                })
            }
            res.status(400).send({
                status: "error",
                data:[],
                message: "Bus stops update failed!"
            })
        } catch (e) {
            console.log("* Controller : \n", e)
            res.status(417).send({
                message: "ERROR!",
                error : e
            })
        }
    }
}