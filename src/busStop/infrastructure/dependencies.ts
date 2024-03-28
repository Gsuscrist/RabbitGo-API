import {MysqlBusStopRepository} from "./repository/mysqlBusStopRepository";
import {CreateBusStopUseCase} from "../application/useCase/createBusStopUseCase";
import {GenerateUuidBusStopUseCase} from "../application/useCase/generateUuidBusStopUseCase";
import {CreateBusStopController} from "./controllers/createBusStopController";
import { GetBusStopController } from "./controllers/getBusStopController";
import { GetBusStopUseCase } from "busStop/application/useCase/getBusStopUseCase";


export const mysqlBusStopRepository = new MysqlBusStopRepository()

export const createBusStopUseCase = new CreateBusStopUseCase(mysqlBusStopRepository)
export const generateUuid = new GenerateUuidBusStopUseCase(mysqlBusStopRepository)
export const createBusStopController = new CreateBusStopController(createBusStopUseCase,generateUuid)

export const getBusStopUseCase = new GetBusStopUseCase(mysqlBusStopRepository)
export const getBusStopController = new GetBusStopController(getBusStopUseCase)