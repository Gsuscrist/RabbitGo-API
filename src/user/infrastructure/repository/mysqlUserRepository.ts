import {UserRepository} from "../../domain/repository/userRepository";
import {Credentials} from "../../domain/entity/credentials";
import {query} from "../../../database/mysql"
import {User} from "../../domain/entity/user";

export class MysqlUserRepository implements UserRepository{
    async generateUuid(name: string):Promise<string|any>{
        try {
            let result
            do{
                const namePrefix = name.slice(0, 3).toLowerCase();
                const randomNumbers = Array.from({ length: 3 }, () =>
                    Math.floor(Math.random() * 10));
                result = '';
                for (let i = 0; i < 3; i++) {
                    result += namePrefix[i] + randomNumbers[i];
                }}while (await this.findById(result))

            return result;
        }catch (e){
            console.log(e)
        }
    }

    async signUp(uuid: string, name: string, lastname: string, credentials: Credentials, role: "admin" | "user"): Promise<any> {
        try {
            const existingUser = await this.findByEmail(credentials.email)
            if (existingUser) {
                throw new Error("There's already an account with these email.");
            }
            const sql = "INSERT INTO users (uuid, name, lastname, email, password, role) VALUES (?,?,?,?,?,?)"
            const params:any[]=[uuid,name,lastname,credentials.email,credentials.password,role]
            const [result]:any = await query(sql,params)
            return new User(uuid,name,lastname,credentials,role,null)
        }catch (e) {
            console.log(e)
            return null
        }
    }


    async findByEmail(email:string):Promise<User|any>{
        try {
            const sql = `SELECT * FROM users WHERE email = ? AND deleted_at IS NULL`;
            const params: any[] = [email];
            const [result]: any = await query(sql, params);
            if (result){
                const user = result[0]
                const credentials = new Credentials(email,user.password)
                return new User(user.uuid,user.name,user.lastname,credentials,user.role, null)
            }
            return null
        }catch (e) {
            console.log("find by email:\n", e)
            return null;
        }
    }

    async findById(uuid: string): Promise<User|any> {
        try {
            const sql ="SELECT * FROM users WHERE uuid = ? AND deleted_at IS NULL";
            const params:any[]=[uuid]
            const [result]:any = await query(sql,params)

            const user = result[0]
            const credentials=new Credentials(user.email,user.password)

            return new User(uuid, user.name, user.lastname, credentials,user.role ,user.deleted_at)
        }catch (e) {
            console.log(e)
            return null
        }
    }

}