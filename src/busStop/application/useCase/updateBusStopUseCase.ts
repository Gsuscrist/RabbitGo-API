import { BusStop } from "busStop/domain/entity/busStop";
import { BusStopRepository } from "busStop/domain/repository/busStopRepository";

export class UpdateBusStopUseCase {
    constructor(readonly repository:BusStopRepository){}

    async run(uuid:string, busStop:BusStop):Promise<BusStop|any>{
        try{
            return await this.repository.update(uuid,busStop);
        } catch(e) {
            console.log("* useCase : \n", e)
        }
    }
}