import express from "express";
import {authenticateMiddleware} from "../../../middleware/authenticator";
import {createBusStopController} from "../dependencies";


export const busStopRouter = express.Router()


busStopRouter.post("/",authenticateMiddleware,createBusStopController.run.bind(createBusStopController))