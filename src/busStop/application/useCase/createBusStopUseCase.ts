
import {BusStopRepository} from "../../domain/repository/busStopRepository";
import {BusStop} from "../../domain/entity/busStop";
import {Decimal128} from "mongodb";

export class CreateBusStopUseCase{
    constructor(readonly repository:BusStopRepository) {
    }

    async run(
        uuid:string,
        name:string,
        latitude:Decimal128,
        longitude:Decimal128,
    ):Promise<BusStop|any>{
        try {
            return await this.repository.create(uuid,name,latitude,longitude)
        }catch (e) {
            console.log("useCase:\n", e)
        }
    }
}