import {Decimal128} from "mongodb";

export class BusStop{
    constructor(
        readonly uuid:string,
        readonly name:string,
        readonly latitude:Decimal128,
        readonly longitude:Decimal128,
        readonly deletedAt:Date|null
    ) {
    }
}