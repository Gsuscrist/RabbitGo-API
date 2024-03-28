
import {Credentials} from "../../domain/entity/credentials";
import {User} from "../../domain/entity/user";
import {UserRepository} from "../../domain/repository/userRepository";
import {EncryptService} from "../../domain/service/encryptService";

export class LoginUserUseCase{
    constructor(readonly repository:UserRepository) {
    }

    async run(
        credentials:Credentials,
        encryptService:EncryptService
    ):Promise<User|any>{
        try {
            return await this.repository.login(credentials,encryptService)
        }catch (e) {
            console.log(e)
            return null
        }
    }
}