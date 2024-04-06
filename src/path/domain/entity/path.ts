import {Decimal128} from "mongodb";

export class Path{
    constructor(
        readonly uuid:string,
        readonly path:string,
        readonly busRouteId:string,
        readonly deletedAt:Date|null
    ) {
    }
}