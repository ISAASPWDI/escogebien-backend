
import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/users/create-user.usecase";
import { CreateUserDto } from "../../application/dtos/users/create-user.dto";
import { LoggedUserUseCase } from "../../application/use-cases/users/logged-user.usecase";


interface userQuery {
  email?: string
}


export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loggedUserUseCase: LoggedUserUseCase
  ) { }

  async loggedUser(req: Request<{}, any, any, userQuery, Record<string, any>> , res: Response): Promise<void> {
    try {
    const { email } = req.query;

    if (!email) {
      res.status(400).json({ error: "El email es requerido en query" });
      return;
    }

    const existsUser = await this.loggedUserUseCase.exec(email);
    if (existsUser) {
        // Devolver los datos en el formato que espera Flutter
        res.status(200).json({
          success: true,
          id: existsUser.id,
          email: existsUser.email,
          firstName: existsUser.firstName,
          lastName: existsUser.lastName,
          image: existsUser.image,
          rol: existsUser.rol,
          authProvider: existsUser.authProvider,
          authProviderId: existsUser.authProviderId,
          message: "Usuario encontrado"
        });
      } else {
        res.status(404).json({ 
          success: false,
          message: "Usuario no encontrado" 
        });
      }
  } catch (error) {
    res.status(500).json({ error: "Error en loggedUser" });
  }
  }
  //todo update this function
  async updateUser(req: Request, res: Response): Promise<void> {
    console.log("📥 Body recibido:", req.body);

    try {


      
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    console.log("📥 Body recibido:", req.body);
    try {
      const createUserDto: CreateUserDto = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: req.body.image || "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
        authProvider: req.body.authProvider,
        authProviderId: req.body.authProviderId,
      };

      if (!createUserDto.email || !createUserDto.firstName || !createUserDto.lastName) {
        res.status(400).json({
          error: "Email, firstName y lastName son requeridos",
        });
        return;
      }

      const user = await this.createUserUseCase.execute(createUserDto);

      res.status(201).json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        // fullName: user.fullName,
        image: user.image,
        authProvider: user.authProvider,
        createdAt: user.createdAt,
        rol: user.rol
      });
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}
