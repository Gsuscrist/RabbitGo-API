import {BusStopRepository} from "../../domain/BusStopRepository";
import {BusStop} from "../../domain/entity/busStop";

export class DeleteBusStopUseCase{
    constructor(readonly repository:BusStopRepository) {
    }

    async run(uuid:string):Promise<BusStop|any>{
        try {
            await this.repository.deleteByUuid(uuid)
        }catch (e) {
            console.log("usecase:\n",e)
        }
    }
}