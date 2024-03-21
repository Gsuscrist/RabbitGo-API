import {Request, Response} from "express";
import { DeleteUserUseCase } from "user/application/useCases/deleteUserUseCase";

export class DeleteUserController{
    constructor(readonly useCase:DeleteUserUseCase){
    }

    async run(req:Request, res:Response){
        try{
            let uuid = req.params.uuid
            await this.useCase.run(uuid)
            res.status(200).send(
                {
                    status: "Success",
                    data:[],
                    message: "User deletion successfully!"
                }
            )
        }catch(e){
            console.log(e)
            res.status(417).send(
                {
                    message: "ERROR!",
                    error:e
                }
            )
        }
    }
}