import {UserRepository} from "../../domain/repository/userRepository";
import {Credentials} from "../../domain/entity/credentials";

export class SignUpUserUseCase{
    constructor(readonly repository:UserRepository) {
    }

    async run(
        uuid: string,
        name: string,
        lastname: string,
        credentials: Credentials,
        role: "admin"| "user",
    ):Promise<any>{
        try {
            return await this.repository.signUp(uuid,name,lastname,credentials,role)
        }catch (e) {
            console.log(e)
            return null
        }
    }
}