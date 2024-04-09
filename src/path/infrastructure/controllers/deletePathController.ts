import {Request,Response} from "express";
import { DeletePathUseCase } from "path/application/useCases/deletePathUseCase";


export class DeletePathController{
    constructor(readonly usecase:DeletePathUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let uuid=req.params.uuid
            const path = await this.usecase.run(uuid)
            res.status(200).send({
                status:"success",
                data:[],
                message:"Path deletion successfully!"
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