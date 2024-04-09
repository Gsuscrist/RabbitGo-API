import {Request,Response} from "express";

import {Path} from "../../domain/entity/path";
import {CreatePathUseCase} from "../../application/useCases/createPathUseCase";
import {GenerateUuidPathUseCase} from "../../application/useCases/generateUuidPathUseCase";

export class CreatePathController{
    constructor(readonly usecase:CreatePathUseCase,readonly generateUuid:GenerateUuidPathUseCase) {
    }

    async run(req:Request,res:Response):Promise<Path|any>{
        try {
            let uuid = await this.generateUuid.run()
            let {path, busRouteId} = req.body
            const newPath = await this.usecase.repository.createPath(uuid,path,busRouteId)
            if (newPath){
                return res.status(201).send({
                    status:"success",
                    data:newPath,
                    message:"path creation successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"path creation failed"
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