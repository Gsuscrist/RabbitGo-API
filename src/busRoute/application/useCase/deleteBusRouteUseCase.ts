import { BusRouteRepository } from "busRoute/domain/repository/busRouteRepository"


export class DeleteBusRouteUseCase{

    constructor(
        readonly repository:BusRouteRepository
    ) {
    }

    async run(uuid:string):Promise<void>{
        try {
             await this.repository.deleteBusRoute(uuid)
        }catch (e) {
            console.log("useCase: \n", e)
        }
    }
}