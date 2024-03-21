import {MysqlUserRepository} from "./repository/mysqlUserRepository";
import {BCryptService} from "../domain/service/bCryptService";
import {SignUpUserUseCase} from "../application/useCases/signUpUserUseCase";
import {GenerateUuidUserUseCase} from "../application/useCases/generateUuidUserUseCase";
import {SignUpUserController} from "./controllers/signUpUserController";
import {LoginUserUseCase} from "../application/useCases/loginUserUseCase";
import {LoginUserController} from "./controllers/loginUserController";
import {Jwt} from "../application/jwt/jwt";


export const database = new MysqlUserRepository()
export const encryptService = new BCryptService()
export const jwt = new Jwt()

export const signUpUserUseCase = new SignUpUserUseCase(database)
export const generateUuid = new GenerateUuidUserUseCase(database)
export const  signUpUserController = new SignUpUserController(signUpUserUseCase,encryptService,generateUuid)


export const logInUserUseCase = new LoginUserUseCase(database)
export const logInUserController = new LoginUserController(logInUserUseCase,encryptService,jwt)
