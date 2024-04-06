import {MysqlPathRepository} from "./repository/mysqlPathRepository";
import {CreatePathUseCase} from "../application/useCases/createPathUseCase";
import {GenerateUuidPathUseCase} from "../application/useCases/generateUuidPathUseCase";
import {CreatePathController} from "./controllers/CreatePathController";

export const mysqlPathRepository = new MysqlPathRepository()


export const createPathUseCase = new CreatePathUseCase(mysqlPathRepository)
export const generateUuid = new GenerateUuidPathUseCase(mysqlPathRepository)
export const createPathController = new CreatePathController(createPathUseCase,generateUuid)