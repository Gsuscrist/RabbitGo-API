import {MysqlUserRepository} from "./repository/mysqlUserRepository";
import {BCryptService} from "../domain/service/bCryptService";
import {SignUpUserUseCase} from "../application/useCases/signUpUserUseCase";
import {GenerateUuidUserUseCase} from "../application/useCases/generateUuidUserUseCase";
import {SignUpUserController} from "./controllers/signUpUserController";


export const database = new MysqlUserRepository()
export const encryptService = new BCryptService()


export const signUpUserUseCase = new SignUpUserUseCase(database)
export const generateUuid = new GenerateUuidUserUseCase(database)
export const  signUpUserController = new SignUpUserController(signUpUserUseCase,encryptService,generateUuid)

