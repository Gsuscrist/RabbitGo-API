
import {BusRoute} from "../../domain/entity/busRoute";
import {BusRouteRepository} from "../../domain/repository/busRouteRepository";

export class GenerateUuidBusRouteUseCase {
    constructor(
        readonly repository:BusRouteRepository
    ) {
    }

    async run(name:string):Promise<BusRoute|any>{
        try {
            return await this.repository.generateUuid(name)
        }catch (e){
            console.log("usecase \n", e)
            return null
        }
    }
}