import express from "express";
import {createPathController} from "../dependencies";
import {authenticateMiddleware} from "../../../middleware/authenticator";

export const pathRouter = express.Router()

pathRouter.post("/",authenticateMiddleware,createPathController.run.bind(createPathController))


