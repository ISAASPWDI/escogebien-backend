import { Request, Response } from "express";
import { GetFavouriteProgramsUseCase } from "../../application/use-cases/users/favourites/get-favourite-programs.usecase";
import { parseNumber } from "../helpers/parseQueries";



export class FavouritesController {
    constructor(
        private readonly getFavouriteProgramsUseCase: GetFavouriteProgramsUseCase,
    ){}
    async getFavouritePrograms(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        try {
            const favourites = await this.getFavouriteProgramsUseCase.exec(parseNumber(userId)!)

            if (favourites?.length === 0) {
                res.status(200).json({
                    success: true,
                    message: "Aún no tienes programas favoritos"
                })
                return
            }
            res.status(200).json(favourites)
        } catch (error) {
            console.error('❌ Error en getFavouritePrograms:', error);
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : "Error desconocido",
            });
        }


    }
}