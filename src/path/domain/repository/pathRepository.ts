import {Decimal128} from "mongodb";
import {Path} from "../entity/path";


export interface PathRepository{
    generateUuid():Promise<string|any>
    createPath(
        uuid:string,
        path:string,
        busRouteId:string
    ):Promise<Path|any>
    getPathById(uuid:string):Promise<Path|any>
    getPathByBus(uuid:string):Promise<Path|any>
    update(uuid:string,path:Path):Promise<Path|any>
    deleteById(uuid:string):Promise<void>
}