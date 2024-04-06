import {query} from "../../../database/mysql"
import {PathRepository} from "../../domain/repository/pathRepository";
import {Path} from "../../domain/entity/path";

export class MysqlPathRepository implements PathRepository{
    async generateUuid(): Promise<string|any> {
        try {
            let result;
            do {
                const randomChars = 'abcdefghijklmnopqrstuvwxyz';
                const randomNumbers = '0123456789';
                result = '';
                for (let i = 0; i < 3; i++) {
                    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
                }
                for (let i = 0; i < 3; i++) {
                    result += randomNumbers.charAt(Math.floor(Math.random() * randomNumbers.length));
                }
            } while (await this.getPathById(result));

            return result;
        } catch (e) {
            console.log(e);
        }
    }
    async createPath(uuid: string, path: string, busRouteId: string): Promise<any> {
        try {
            const startSql = "SELECT * FROM bus_routes WHERE uuid = ? AND deleted_at IS NULL"
            const [startResult]:any = await query(startSql,[busRouteId])
            if (startResult.length>0){
                const sql = "INSERT INTO paths(uuid,path,bus_route_id) VALUES(?,?,?)"
                const params:any[]=[uuid,JSON.parse(path),busRouteId]
                const [result]:any= await query(sql,params)
                if (result){
                    return new Path(uuid,path,busRouteId,null)
                }
            }
        }catch (e) {
            console.log("repository:\n",e)
        }
    }

    async getPathById(uuid: string): Promise<any> {
        try {
            const sql="SELECT * FROM paths WHERE uuid=? AND deleted_at IS NULL"
            const params:any[]=[uuid]
            const [result]:any=await query(sql,params)
            if (result){
                const path = result[0]
                return new Path(path.uuid,path.path,path.bus_route_id,path.deleted_at)
            }
        }catch (e) {
            console.log("repository:\n",e)
            return null
        }
    }
    
}