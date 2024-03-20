import {User} from "../user";
import {Credentials} from "../credentials";

export interface UserRepository{

    signUp(
        uuid:string,
        name:string,
        lastname:string,
        credentials:Credentials,
        role: "admin" | "user"
    ):Promise<User|any>

}