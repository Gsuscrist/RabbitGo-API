import {User} from "../entity/user";
import {Credentials} from "../entity/credentials";

export interface UserRepository{
    generateUuid(name:string):Promise<string|any>
    signUp(
        uuid:string,
        name:string,
        lastname:string,
        credentials:Credentials,
        role: "admin" | "user"
    ):Promise<User|any>

}