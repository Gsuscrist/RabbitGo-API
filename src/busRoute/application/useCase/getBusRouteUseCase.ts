
import { BusRouteRepository } from "busRoute/domain/repository/busRouteRepository";
import {BusRoute} from "../../domain/entity/busRoute";

export class GetBusRouteUseCase{
    constructor(readonly repository:BusRouteRepository) {
    }

    async runByUuid(uuid:string):Promise<BusRoute|any>{
        try {
            return await this.repository.getByUuid(uuid)
        }catch (e) {
            console.log("Usecase: \n", e)
        }
    }

}