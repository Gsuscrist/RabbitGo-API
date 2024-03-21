import {UserRepository} from "../../domain/repository/userRepository";
import {Credentials} from "../../domain/entity/credentials";
import {query} from "../../../database/mysql"
import {User} from "../../domain/entity/user";

export class MysqlUserRepository implements UserRepository{
    async generateUuid(name: string):Promise<string|any>{
        try {
            let result
                const namePrefix = name.slice(0, 3).toLowerCase();
                const randomNumbers = Array.from({ length: 3 }, () =>
                    Math.floor(Math.random() * 10));
                result = '';
                for (let i = 0; i < 3; i++) {
                    result += namePrefix[i] + randomNumbers[i];
                }
            return result;
        }catch (e){
            console.log(e)
        }
    }

    async signUp(uuid: string, name: string, lastname: string, credentials: Credentials, role: "admin" | "user"): Promise<any> {
        try {
            const sql = "INSERT INTO users (uuid, name, lastname, email, password, role) VALUES (?,?,?,?,?,?)"
            const params:any[]=[uuid,name,lastname,credentials.email,credentials.password,role]
            const [result]:any = await query(sql,params)
            return new User(uuid,name,lastname,credentials,role,null)
        }catch (e) {
            console.log(e)
            return null
        }
    }

}