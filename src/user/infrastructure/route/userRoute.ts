import express from "express";
import {logInUserController, signUpUserController} from "../dependencies";


export const userRoute = express.Router();

userRoute.post("/", signUpUserController.run.bind(signUpUserController))
userRoute.post("/login", logInUserController.run.bind(logInUserController))