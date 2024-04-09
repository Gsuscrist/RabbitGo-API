import {BusRoute} from "../entity/busRoute";

export interface BusRouteRepository {
    generateUuid(name:string):Promise<string |any>
    getByUuid(uuid:string):Promise<BusRoute|any>
    getByName(name:string):Promise<BusRoute|any>
    getByTime(time:string):Promise<BusRoute|any>
    getByBusStop(busStopId:string):Promise<BusRoute[]|any>
    createBusRoute(
        uuid:string,
        name: string,
        price: number,
        startTime: string,
        endTime: string,
        busStopId:string
    ):Promise<BusRoute|any>
    updateBusRoute(uuid:string,busRoute:BusRoute):Promise<BusRoute|any>


}