import {Request,Response} from "express";
import {DeleteBusStopUseCase} from "../../application/useCase/deleteBusStopUseCase";

export class DeleteBusStopController{
    constructor(readonly usecase:DeleteBusStopUseCase) {
    }

    async run(req:Request,res:Response):Promise<void>{
        try {
            let uuid=req.params.uuid
            await this.usecase.run(uuid)
            res.status(204).send({
                status:"success",
                data:[],
                message:"bus stop deletion successfully"
            })
        }catch (e) {
            console.log("controller:\n",e)
            res.status(417).send({
                message:"error",
                error: e
            })
        }
    }
}