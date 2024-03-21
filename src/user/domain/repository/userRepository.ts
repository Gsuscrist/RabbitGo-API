import {User} from "../entity/user";
import {Credentials} from "../entity/credentials";
import {EncryptService} from "../service/encryptService";

export interface UserRepository{
    generateUuid(name:string):Promise<string|any>
    delete(uuid:string):Promise<void>
    update(uuid:string, user:User):Promise<User|any>
    signUp(
        uuid:string,
        name:string,
        lastname:string,
        credentials:Credentials,
        role: "admin" | "user"
    ):Promise<User|any>
    login(credentials:Credentials,encryptService:EncryptService):Promise<User|any>

}