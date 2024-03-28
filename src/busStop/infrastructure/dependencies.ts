import {MysqlBusStopRepository} from "./repository/mysqlBusStopRepository";
import {CreateBusStopUseCase} from "../application/useCase/createBusStopUseCase";
import {GenerateUuidBusStopUseCase} from "../application/useCase/generateUuidBusStopUseCase";
import {CreateBusStopController} from "./controllers/createBusStopController";
import { UpdateBusStopUseCase } from "busStop/application/useCase/updateBusStopUseCase";
import { UpdateBusStopController } from "./controllers/updateBusStopController";


export const mysqlBusStopRepository = new MysqlBusStopRepository()

export const createBusStopUseCase = new CreateBusStopUseCase(mysqlBusStopRepository)
export const generateUuid = new GenerateUuidBusStopUseCase(mysqlBusStopRepository)
export const createBusStopController = new CreateBusStopController(createBusStopUseCase,generateUuid)

export const updateBusStopUseCase = new UpdateBusStopUseCase(mysqlBusStopRepository)
export const updateBusStopController = new UpdateBusStopController(updateBusStopUseCase)