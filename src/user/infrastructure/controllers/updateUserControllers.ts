import { Request, Response } from "express";
import { UpdateUserUseCase } from "user/application/useCases/updateUserUseCase";
import { EncryptService } from "user/domain/service/encryptService";
import { Credentials } from "user/domain/entity/credentials";
import { User } from "user/domain/entity/user";

export class UpdateUserController{
    constructor(
        readonly useCase:UpdateUserUseCase, 
        readonly encrypt:EncryptService
        ){}
    
        async run(req:Request,res:Response){
            try {
                let uuid = req.params.uuid
                let{name,lastname,email,password,role}= req.body
                password = await this.encrypt.execute(password)
                let credentials = new Credentials(email, password)
                let user = new User(uuid,name,lastname,credentials,role,null)
                const updatedUser = await this.useCase.run(uuid,user)
                if (updatedUser){
                    res.status(200).send({
                        status:"success",
                        data:{
                            uuid:updatedUser.uuid,
                            name:updatedUser.name,
                            lastname:updatedUser.lastname,
                            email:updatedUser.credentials.email
                        },
                        message:"User updating successfully!"
                    })
                }
                res.status(400).send({
                    status:"error",
                    data:[],
                    message:"User update fail!"
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