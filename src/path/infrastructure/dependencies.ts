import {MysqlPathRepository} from "./repository/mysqlPathRepository";
import {CreatePathUseCase} from "../application/useCases/createPathUseCase";
import {GenerateUuidPathUseCase} from "../application/useCases/generateUuidPathUseCase";
import {CreatePathController} from "./controllers/CreatePathController";
import { GetPathUseCase } from "path/application/useCases/getPathUseCase";
import { GetPathController } from "./controllers/getPathController";
import { UpdatePathUseCase } from "path/application/useCases/updatePathUseCase";
import { UpdatePathController } from "./controllers/updatePathController";
import { DeletePathUseCase } from "path/application/useCases/deletePathUseCase";
import { DeletePathController } from "./controllers/deletePathController";

export const mysqlPathRepository = new MysqlPathRepository()


export const createPathUseCase = new CreatePathUseCase(mysqlPathRepository)
export const generateUuid = new GenerateUuidPathUseCase(mysqlPathRepository)
export const createPathController = new CreatePathController(createPathUseCase,generateUuid)
export const getPathUseCase = new GetPathUseCase(mysqlPathRepository)
export const getPathController = new GetPathController(getPathUseCase)
export const updatePathUseCase = new UpdatePathUseCase(mysqlPathRepository)
export const updatePathController = new UpdatePathController(updatePathUseCase)
export const deletePathUseCase = new DeletePathUseCase(mysqlPathRepository)
export const deletePathController = new DeletePathController(deletePathUseCase)