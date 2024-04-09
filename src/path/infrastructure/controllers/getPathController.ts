import { GetPathUseCase} from "path/application/useCases/getPathUseCase";
import {Response,Request} from "express";

export class GetPathController{
    constructor(readonly useCase:GetPathUseCase){}

    async runByPathId(req:Request,res:Response){
        try {
            let uuid = req.params.uuid
            const path = await this.useCase.runById(uuid)
            if(path){
                return res.status(200).send({
                    status: "success",
                    data: path,
                    message : "Path getting successfully!"
                    })
            }
            res.status(400).send({
                status: "error",
                data: [],
                message: "Path getting failed!"
            })
        }catch(e){
            console.log("* Controller : ",e)
            res.status(417).send({
                message:"error",
                error: e
            })
        }
    }
    
    async runByRouteId(req:Request,res:Response){
        try {
            let uuid=req.params.uuid
            const path = await this.useCase.runByRoute(uuid)
            if (path){
                return res.status(200).send({
                    status:"success",
                    data:path,
                    message:"Path getting successfully!"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"Path getting failed!"
            })
        }catch (e) {
            console.log("* Controller : ",e)
            res.status(417).send({
                message:"error",
                error:e
            })
        }
    }
}