import { PathRepository } from "path/domain/repository/pathRepository"


export class DeletePathUseCase{
    constructor(readonly repository:PathRepository) {
    }

    async run(uuid:string){
        try {
            return await this.repository.deleteById(uuid)
        }catch (e) {
            console.log(" * Usecase:\n",e)
        }
    }
}