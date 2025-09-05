import { Router } from "express";
import { UserController } from "./user.controller";
import { UserRepositoryImpl } from "../../infraestrucure/repositories/user.repository.impl";
import { UuidGenerator } from "../../infraestrucure/adapters/UuidGenerator";
import { CreateUserUseCase } from "../../application/use-cases/users/create-user.usecase";
import { userDataSource } from "../../config/config";
import { LoggedUserUseCase } from "../../application/use-cases/users/logged-user.usecase";

const router = Router();


const userRepository = new UserRepositoryImpl(userDataSource);
const idGenerator = new UuidGenerator();
// casos de uso
const createUserUseCase = new CreateUserUseCase(userRepository, idGenerator);
const loggedUserUseCase = new LoggedUserUseCase(userRepository)

// controller
const userController = new UserController(createUserUseCase, loggedUserUseCase);

// rutas
router.post("/users", (req, res) => userController.createUser(req, res));
router.get("/users", (req, res) => userController.loggedUser(req, res));




export default router;
