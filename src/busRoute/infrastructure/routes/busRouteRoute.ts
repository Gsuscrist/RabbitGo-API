import express from "express";

import {authenticateMiddleware} from "../../../middleware/authenticator";
import {createBusRouteController} from "../dependecies";

export const busRoute = express.Router();

busRoute.post("/",authenticateMiddleware,createBusRouteController.run.bind(createBusRouteController))
