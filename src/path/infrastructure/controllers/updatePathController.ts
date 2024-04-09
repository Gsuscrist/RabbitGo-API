import { Request,Response } from "express";
import { Path } from "../../domain/entity/path";
import { UpdatePathUseCase } from "path/application/useCases/updatePathUseCase";


export class UpdatePathController{
    constructor(readonly useCase:UpdatePathUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let uuid = req.params.uuid
            let {path, busRouteId} = req.body
            const newPath = new Path(uuid,path,busRouteId,null)
            const pathUpdated = await this.useCase.run(uuid,newPath)
            if (pathUpdated){
                return res.status(200).send({
                    status:"success",
                    data:pathUpdated,
                    message:"Path updating successfully!"
                })
            }
            res.status(400).send({
                status:"failed",
                data:[],
                message:"Path updating failed!"
            })
        }catch (e) {
            console.log(" * Controller:\n",e)
        }
    }
}