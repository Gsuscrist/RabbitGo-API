import {BusStop} from "../entity/busStop";
import {Decimal128} from "mongodb";

export interface BusStopRepository{
    generateUuid(name:string):Promise<string|any>
    create(
        uuid:string,
        name:string,
        latitude:Decimal128,
        longitude:Decimal128
    ):Promise<BusStop|any>
}