import express from "express";
import {logInUserController, signUpUserController, deleteUserController, updateUserController} from "../dependencies";


export const userRoute = express.Router();

userRoute.post("/", signUpUserController.run.bind(signUpUserController))
userRoute.post("/login", logInUserController.run.bind(logInUserController))
userRoute.delete("/:uuid",deleteUserController.run.bind(deleteUserController))
userRoute.put("/:uuid", updateUserController.run.bind(updateUserController))