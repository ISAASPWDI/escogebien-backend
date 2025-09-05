
import { Router } from "express";
import { favouriteDataSource, userDataSource } from "../../config/config";
import { FavouriteProgramImpl } from "../../infraestrucure/repositories/favourite.repository.impl";
import { GetFavouriteProgramsUseCase } from "../../application/use-cases/users/favourites/get-favourite-programs.usecase";
import { FavouritesController } from "./favourite.controller";
import { UserRepositoryImpl } from "../../infraestrucure/repositories/user.repository.impl";
import { LoggedUserUseCase } from "../../application/use-cases/users/logged-user.usecase";

const router = Router();

// infra
const programRepository = new FavouriteProgramImpl(favouriteDataSource);
const userRepository = new UserRepositoryImpl(userDataSource);

// casos de uso
const getFavouriteProgramsUseCase = new GetFavouriteProgramsUseCase(programRepository,userRepository );


// controller
const getFavouriteProgramsController = new FavouritesController(
    getFavouriteProgramsUseCase,
);

// rutas
router.get("/favourites/:userId", (req, res) => getFavouriteProgramsController.getFavouritePrograms(req, res));


export default router;
