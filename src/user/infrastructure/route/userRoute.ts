import express from "express";

import {logInUserController, signUpUserController, deleteUserController, updateUserController, getUserController} from "../dependencies";


export const userRoute = express.Router();

userRoute.post("/", signUpUserController.run.bind(signUpUserController))
userRoute.post("/login", logInUserController.run.bind(logInUserController))
userRoute.delete("/:uuid",deleteUserController.run.bind(deleteUserController))
userRoute.put("/:uuid", updateUserController.run.bind(updateUserController))
userRoute.get("/:uuid", getUserController.run.bind(getUserController))
userRoute.delete("/:uuid",deleteUserController.run.bind(deleteUserController))

