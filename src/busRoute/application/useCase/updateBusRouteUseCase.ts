import { BusRouteRepository } from "busRoute/domain/repository/busRouteRepository";
import {BusRoute} from "../../domain/entity/busRoute";

export class UpdateBusRouteUseCase{
    constructor(readonly repository:BusRouteRepository) {
    }

    async run(uuid:string, busRoute:BusRoute):Promise<BusRoute|any>{
        try {
            return await this.repository.updateBusRoute(uuid, busRoute)
        }catch (e) {
            console.log("usecase: \n", e)
            return null
        }
    }
}