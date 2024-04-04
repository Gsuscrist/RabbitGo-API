import {BusStop} from "../entity/busStop";
import {Decimal128} from "mongodb";

export interface BusStopRepository{
    generateUuid(name:string):Promise<string|any>
    getByUuid(uuid:string):Promise<BusStop|any>
    getAll():Promise<BusStop[]|any>
    create(
        uuid:string,
        name:string,
        latitude:Decimal128,
        longitude:Decimal128
    ):Promise<BusStop|any>
    update(uuid:string,busStop:BusStop):Promise<BusStop|any>
    deleteByUuid(uuid:string):Promise<void>
}