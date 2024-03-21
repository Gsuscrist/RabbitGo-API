import { UserRepository } from "user/domain/repository/userRepository";
import {User} from "../../domain/entity/user";

export class GetUserUseCase{
    constructor(readonly repository:UserRepository) {
    }

    async run(
        uuid:string
    ):Promise<User|any>{
        try {
            return await this.repository.getById(uuid)
        }catch (e) {
            console.log(e)
            return null
        }
    }

}