import {BusRoute} from "../entity/busRoute";

export interface BusRouteRepository {
    generateUuid(name:string):Promise<string |any>
    createBusRoute(
        uuid:string,
        name: string,
        price: number,
        startTime: string,
        endTime: string,
        busStopId:string
    ):Promise<BusRoute|any>



}