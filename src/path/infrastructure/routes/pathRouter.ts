import express from "express";
import {createPathController, getPathController, updatePathController} from "../dependencies";
import {authenticateMiddleware} from "../../../middleware/authenticator";

export const pathRouter = express.Router()

pathRouter.post("/",authenticateMiddleware,createPathController.run.bind(createPathController))

pathRouter.get("/:uuid",authenticateMiddleware,getPathController.runByPathId.bind(getPathController))
pathRouter.get("/route/:uuid",authenticateMiddleware,getPathController.runByRouteId.bind(getPathController))

pathRouter.put("/:uuid",authenticateMiddleware,updatePathController.run.bind(updatePathController))