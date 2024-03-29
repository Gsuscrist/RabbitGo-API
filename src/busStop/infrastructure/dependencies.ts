import {MysqlBusStopRepository} from "./repository/mysqlBusStopRepository";
import {CreateBusStopUseCase} from "../application/useCase/createBusStopUseCase";
import {GenerateUuidBusStopUseCase} from "../application/useCase/generateUuidBusStopUseCase";
import {CreateBusStopController} from "./controllers/createBusStopController";
import { GetBusStopController } from "./controllers/getBusStopController";
import { GetBusStopUseCase } from "busStop/application/useCase/getBusStopUseCase";
import { UpdateBusStopUseCase } from "busStop/application/useCase/updateBusStopUseCase";
import { UpdateBusStopController } from "./controllers/updateBusStopController";
import { DeleteBusStopUseCase } from "busStop/application/useCase/deleteBusStopUseCase";
import { DeleteBusStopController } from "./controllers/deleteBusStopControllers";


export const mysqlBusStopRepository = new MysqlBusStopRepository()

export const createBusStopUseCase = new CreateBusStopUseCase(mysqlBusStopRepository)
export const generateUuid = new GenerateUuidBusStopUseCase(mysqlBusStopRepository)
export const createBusStopController = new CreateBusStopController(createBusStopUseCase,generateUuid)

export const getBusStopUseCase = new GetBusStopUseCase(mysqlBusStopRepository)
export const getBusStopController = new GetBusStopController(getBusStopUseCase)

export const updateBusStopUseCase = new UpdateBusStopUseCase(mysqlBusStopRepository)
export const updateBusStopController = new UpdateBusStopController(updateBusStopUseCase)

export const deleteBusStopUseCase = new DeleteBusStopUseCase(mysqlBusStopRepository)
export const deleteBusStopController = new DeleteBusStopController(deleteBusStopUseCase)

