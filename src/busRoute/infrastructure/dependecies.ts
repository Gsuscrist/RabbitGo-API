import {MysqlBusRouteRepository} from "./repository/mysqlBusRouteRepository";
import {CreateBusRouteUseCase} from "../application/useCase/createBusRouteUseCase";
import {GenerateUuidBusRouteUseCase} from "../application/useCase/generateUuidBusRouteUseCase";
import {CreateBusRouteController} from "./controllers/createBusRouteController";
import { GetBusRouteUseCase } from "busRoute/application/useCase/getBusRouteUseCase";
import { GetBusRouteController } from "./controllers/getBusRouteController";
import { UpdateBusRouteUseCase } from "busRoute/application/useCase/updateBusRouteUseCase";
import { UpdateBusRouteController } from "./controllers/updateBusRouteController";

export const mysqlBusRouteRepository = new MysqlBusRouteRepository()

export const createBusRouteUseCase = new CreateBusRouteUseCase(mysqlBusRouteRepository)
export const generateUuid = new GenerateUuidBusRouteUseCase(mysqlBusRouteRepository)
export const createBusRouteController = new CreateBusRouteController(createBusRouteUseCase,generateUuid)

export const getBusRouteUseCase = new GetBusRouteUseCase(mysqlBusRouteRepository)
export const getBusRouteController = new GetBusRouteController(getBusRouteUseCase)

export const updateBusRouteUseCase = new UpdateBusRouteUseCase(mysqlBusRouteRepository)
export const updateBusRouteController = new UpdateBusRouteController(updateBusRouteUseCase)
