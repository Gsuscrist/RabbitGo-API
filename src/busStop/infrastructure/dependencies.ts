import {MysqlBusStopRepository} from "./repository/mysqlBusStopRepository";
import {CreateBusStopUseCase} from "../application/useCase/createBusStopUseCase";
import {GenerateUuidBusStopUseCase} from "../application/useCase/generateUuidBusStopUseCase";
import {CreateBusStopController} from "./controllers/createBusStopController";


export const mysqlBusStopRepository = new MysqlBusStopRepository()

export const createBusStopUseCase = new CreateBusStopUseCase(mysqlBusStopRepository)
export const generateUuid = new GenerateUuidBusStopUseCase(mysqlBusStopRepository)
export const createBusStopController = new CreateBusStopController(createBusStopUseCase,generateUuid)