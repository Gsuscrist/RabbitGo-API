import {query} from "../../../database/mysql"
import {BusRouteRepository} from "../../domain/repository/busRouteRepository";
import {BusRoute} from "../../domain/entity/busRoute";

export class MysqlBusRouteRepository implements BusRouteRepository{
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
                }}while (await this.getByUuid(result))

            return result;
        }catch (e){
            console.log("uuid gen:\n",e)
        }
    }

    async createBusRoute(uuid: string, name: string, price: number, startTime: string, endTime: string, busStopId:string): Promise<any> {
        try {
            let sql = "SELECT * FROM bus_stops WHERE uuid=?"
            let params:any[]=[busStopId]
            let [validation]:any = await query(sql,params)
            if (validation.length>0){
                sql = "INSERT INTO bus_routes(uuid,name,price,start_time,end_time,bus_stop_id) VALUES (?,?,?,?,?,?)"
                params=[uuid,name,price,startTime,endTime,busStopId]
                const [result]:any = await query(sql,params)
                return new BusRoute(uuid,name,price,startTime,endTime,busStopId,null)
            }else {
                throw new Error("Bus stop do not exist")
            }

        }catch (e) {
            console.log("repository:\n",e)
        }
    }


    async getByUuid(uuid: string): Promise<any> {
        try {
            const sql = "SELECT * FROM bus_routes WHERE uuid = ? AND deleted_at IS NULL"
            const params:any[]=[uuid]
            const [result]:any = await query(sql,params)
            const busRoute = result[0]
            return new BusRoute(uuid, busRoute.name, busRoute.price, busRoute.start_time, busRoute.end_time,busRoute.bus_stop_id, busRoute.deleted_at)
        }catch (e) {
            console.log("repository:\n", e)
        }
    }



}