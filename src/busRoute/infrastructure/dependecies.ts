import {MysqlBusRouteRepository} from "./repository/mysqlBusRouteRepository";
import {CreateBusRouteUseCase} from "../application/useCase/createBusRouteUseCase";
import {GenerateUuidBusRouteUseCase} from "../application/useCase/generateUuidBusRouteUseCase";
import {CreateBusRouteController} from "./controllers/createBusRouteController";

export const mysqlBusRouteRepository = new MysqlBusRouteRepository()

export const createBusRouteUseCase = new CreateBusRouteUseCase(mysqlBusRouteRepository)
export const generateUuid = new GenerateUuidBusRouteUseCase(mysqlBusRouteRepository)
export const createBusRouteController = new CreateBusRouteController(createBusRouteUseCase,generateUuid)
