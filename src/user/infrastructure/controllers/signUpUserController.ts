import {Request,Response} from "express";
import {SignUpUserUseCase} from "../../application/useCases/signUpUserUseCase";
import {EncryptService} from "../../domain/service/encryptService";
import {GenerateUuidUserUseCase} from "../../application/useCases/generateUuidUserUseCase";
import {Credentials} from "../../domain/entity/credentials";

export class SignUpUserController{

    constructor(readonly useCase:SignUpUserUseCase, readonly encryptService:EncryptService, readonly uuid:GenerateUuidUserUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let {name,lastname,email,password, role} = req.body
            password = await this.encryptService.execute(password)
            let credentials = new Credentials(email,password)
            let uuid = await this.uuid.run(name)
            if (role === null || role !=="user" || role!=="admin"){role = "user"}
            const createdUser = await this.useCase.run(uuid,name,lastname,credentials, role)
            if (createdUser){
                return res.status(201).send({
                    status:"success",
                    data:{
                        uuid:createdUser.uuid,
                        name:createdUser.name,
                        lastname:createdUser.lastname,
                        email:createdUser.credentials.email,
                        role:createdUser.role,
                    },
                    message:"user creation successfully",
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"user creation failed"
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