import express from "express";
import {signUpUserController} from "../dependencies";


export const userRoute = express.Router();

userRoute.post("/", signUpUserController.run.bind(signUpUserController))