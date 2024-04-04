import {BusStopRepository} from "../../domain/repository/busStopRepository";

export class GenerateUuidBusStopUseCase{
    constructor(readonly repository:BusStopRepository) {
    }

    async run(name:string):Promise<string|any>{
        try {
            return await this.repository.generateUuid(name)
        }catch (e) {
            console.log("useCase:\n",e)
        }
    }
}