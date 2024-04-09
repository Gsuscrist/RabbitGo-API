import {PathRepository} from "../../domain/repository/pathRepository";


export class GenerateUuidPathUseCase {
    constructor(readonly repository:PathRepository) {
    }

    async run(){
        try {
            return await this.repository.generateUuid()
        }catch (e) {
            console.log("usecase:\n",e)
            return null
        }
    }
}