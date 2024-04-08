import {PathRepository} from "../../domain/pathRepository";
import {Path} from "../../domain/entity/path";

export class UpdatePathUseCase{
    constructor(readonly repository:PathRepository){}

    async run(uuid:string,path:Path):Promise<Path|any>{
        try {
            return await this.repository.update(uuid,path)
        }catch (e) {
            console.log(" * Usecase:\n",e)
        }
    }
}