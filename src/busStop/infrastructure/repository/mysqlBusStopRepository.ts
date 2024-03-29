import {BusStopRepository} from "../../domain/repository/busStopRepository";
import {Decimal128} from "mongodb";
import {query} from "../../../database/mysql";
import {BusStop} from "../../domain/entity/busStop";

export class MysqlBusStopRepository implements BusStopRepository{

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
            console.log(e)
        }
    }

    async create(uuid: string, name: string, latitude: Decimal128, longitude: Decimal128): Promise<any> {
        try {
            const sql = "INSERT INTO bus_stops (uuid,name,latitude,longitude) VALUES(?,?,?,?)"
            const params :any[]=[uuid,name,latitude,longitude]

            const [results]:any= await query(sql,params)
            return new BusStop(uuid,name,latitude,longitude,null)
        }catch (e) {
            console.log("repository:\n",e)
            return null
        }
    }

    async getByUuid(uuid: string): Promise<any> {
        try {
            const sql = "SELECT * FROM bus_stops WHERE uuid=? AND deleted_at IS NULL"
            const params:any[]=[uuid]
            const [result]:any= await query(sql,params)
            if (result){
                const busStop = result[0]
                return new BusStop(busStop.uuid,busStop.name,busStop.latitude,busStop.longitude,null)
            }
            return null
        }catch (e) {
            console.log("repository:\n",e)
            return null
        }
    }


    async getAll(): Promise<any> {
        try {
            const sql="SELECT * FROM bus_stops WHERE deleted_at IS NULL"
            const params:any[]=[]
            const [result]:any= await query(sql,params)
            return result.map((busStopData:any)=>
                new BusStop(
                    busStopData.uuid,
                    busStopData.name,
                    busStopData.latitude,
                    busStopData.longitude,
                    busStopData.deleted_at
                )
            );

        }catch (e) {
            console.log("repository:\n",e)
            return null
        }
    }


    async update(uuid:string, busStop:BusStop):Promise<any> {
        try {
            if (await this.getByUuid(uuid)) {
                const sql = "UPDATE bus_routes SET name=?,latitude=?,longitude=? WHERE uuid=?"
                const params:any[] = [busStop.name,busStop.latitude,busStop.longitude,uuid]
                const [result]:any = await query(sql,params)
                if(result){
                    return busStop
                }
                return null
            }
        } catch (e) {
            console.log(" * Repository : \n", e)
            return null
        }
    }

    async deleteByUuid(uuid: string): Promise<void> {
        try {
            const date = new Date()
            const sql ="UPDATE bus_stops SET deleted_at = ? WHERE uuid = ?";
            const params :any[] = [date,uuid]
            const [result]: any = await query(sql, params)
        }catch (e) {
            console.log("repository:\n",e)
        }
    }
}