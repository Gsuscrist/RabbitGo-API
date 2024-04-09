
import {BusRoute} from "../../domain/entity/busRoute";
import {BusRouteRepository} from "../../domain/repository/busRouteRepository";

export class CreateBusRouteUseCase{

    constructor(
        readonly repository:BusRouteRepository
    ) {
    }

    async run(
        uuid:string,
        name: string,
        price: number,
        startTime: string,
        endTime: string,
        busStopId: string
    ):Promise<BusRoute|any>{
        try {
            return await this.repository.createBusRoute(uuid, name, price, startTime, endTime, busStopId)
        }catch (e) {
            console.log("UseCase:\n", e)
            return null
        }
    }

}