import { UserRepository } from "user/domain/repository/userRepository";
import { User } from "user/domain/entity/user";

export class UpdateUserUseCase{
    constructor(readonly repository:UserRepository){}

    async run(
        uuid:string,
        user:User
    ):Promise<User|any>{
        try{
            return await this.repository.update(uuid,user);
        }catch(e){
            console.log(e);
            return null;
        }
    }
}