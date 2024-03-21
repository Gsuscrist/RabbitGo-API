import express from "express";
import {getUserController, logInUserController, signUpUserController} from "../dependencies";


export const userRoute = express.Router();

userRoute.post("/", signUpUserController.run.bind(signUpUserController))
userRoute.post("/login", logInUserController.run.bind(logInUserController))
userRoute.get("/:uuid", getUserController.run.bind(getUserController))