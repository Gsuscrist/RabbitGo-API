import { Path } from "path/domain/entity/path";
import { PathRepository } from "path/domain/repository/pathRepository";

export class GetPathUseCase{
    constructor(readonly repository:PathRepository){}

    async runById(uuid:string):Promise<Path|any>{
        try{
            return await this.repository.getPathById(uuid);

        }catch(e) {
            console.log("* UseCase: \n", e)
            return null
        }
    }

    async runByRoute(uuid:string):Promise<Path|any>{
        try {
            return await this.repository.getPathByBus(uuid)
        }catch (e) {
            console.log("* Usecase:\n",e)
            return null
        }
    }
}