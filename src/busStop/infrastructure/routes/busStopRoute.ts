import express from "express";
import {authenticateMiddleware} from "../../../middleware/authenticator";
import {createBusStopController, deleteBusStopController, getBusStopController, updateBusStopController} from "../dependencies";




export const busStopRouter = express.Router()


busStopRouter.post("/",authenticateMiddleware,createBusStopController.run.bind(createBusStopController))
busStopRouter.get("/",authenticateMiddleware,getBusStopController.run.bind(getBusStopController))
busStopRouter.get("/:uuid",authenticateMiddleware,getBusStopController.runById.bind(getBusStopController))
busStopRouter.put("/:uuid",authenticateMiddleware,updateBusStopController.run.bind(updateBusStopController))
busStopRouter.delete("/:uuid",authenticateMiddleware,deleteBusStopController.run.bind(deleteBusStopController)) 

