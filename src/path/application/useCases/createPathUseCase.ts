
import {Decimal128} from "mongodb";
import {Path} from "../../domain/entity/path";
import {PathRepository} from "../../domain/repository/pathRepository";

export class CreatePathUseCase{
    constructor(readonly repository:PathRepository) {
    }

    async run(uuid:string,
              path:string,
              busRouteId:string):Promise<Path|any>{
        try {
            return await this.repository.createPath(uuid,path,busRouteId)
        }catch (e) {
            console.log("usecase:\n",e)
        }
    }
}