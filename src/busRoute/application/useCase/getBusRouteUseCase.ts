
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


    async runByName(name:string):Promise<BusRoute|any>{
        try {
            return await this.repository.getByName(name)
        }catch (e) {
            console.log("UseCase: \n",e)
        }
    }

    async runByTime(time:string):Promise<BusRoute|any>{
        try {
            return await this.repository.getByTime(time)
        }catch (e){
            console.log("Usecase \n", e)
        }
    }

    async runByBusStop(uuid:string):Promise<BusRoute[]|any>{
        try {
            return await this.repository.getByBusStop(uuid)
        }catch (e) {
            console.log("usecase\n:",e)
        }
    }



}