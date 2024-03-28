import express from "express";

import {logInUserController, signUpUserController, deleteUserController, updateUserController, getUserController} from "../dependencies";
import { authenticateMiddleware } from "middleware/authenticator";


export const userRoute = express.Router();

userRoute.post("/",signUpUserController.run.bind(signUpUserController))
userRoute.post("/login",logInUserController.run.bind(logInUserController))
userRoute.delete("/:uuid",deleteUserController.run.bind(deleteUserController))
userRoute.put("/:uuid",authenticateMiddleware, updateUserController.run.bind(updateUserController))
userRoute.get("/:uuid",authenticateMiddleware, getUserController.run.bind(getUserController))
userRoute.delete("/:uuid",authenticateMiddleware, deleteUserController.run.bind(deleteUserController))

