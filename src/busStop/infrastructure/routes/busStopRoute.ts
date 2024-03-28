import express from "express";
import {authenticateMiddleware} from "../../../middleware/authenticator";
import {createBusStopController, getBusStopController} from "../dependencies";


export const busStopRouter = express.Router()


busStopRouter.post("/",authenticateMiddleware,createBusStopController.run.bind(createBusStopController))
busStopRouter.get("/:uuid",authenticateMiddleware,getBusStopController.runById.bind(getBusStopController))