import express from "express";
import {authenticateMiddleware} from "../../../middleware/authenticator";
import {createBusStopController, updateBusStopController} from "../dependencies";


export const busStopRouter = express.Router()


busStopRouter.post("/",authenticateMiddleware,createBusStopController.run.bind(createBusStopController))
busStopRouter.put("/:uuid",authenticateMiddleware,updateBusStopController.run.bind(updateBusStopController))