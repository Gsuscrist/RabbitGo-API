import { BusStopRepository } from "busStop/domain/repository/busStopRepository";
import {BusStop} from "../../domain/entity/busStop";

export class GetBusStopUseCase{
    constructor(readonly repository:BusStopRepository) {
    }

    async runByUuid(uuid:string):Promise<BusStop|any>{
        try {
            return await this.repository.getByUuid(uuid)
        }catch (e) {
            console.log("usecase:\n",e)
        }
    }

    async run():Promise<BusStop[]|any>{
        try {
            return await this.repository.getAll()
        }catch (e){
            console.log("usecase:\n",e)
        }
    }
}