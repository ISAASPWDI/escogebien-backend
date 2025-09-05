import express, { Router } from "express";
// import compression from "compression";
import path from "path";
// Importaciones de rutas
import userRoutes from "./presentation/users/route";
import categoryRoutes from "./presentation/categories/route";
import programRoutes from "./presentation/programs/route";
import universityRoutes from "./presentation/universities/route";
import favouriteRoutes from "./presentation/favourites/route";
interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    this.app.use(express.json());
    // this.app.use(compression());
    this.app.use(express.static(path.resolve(this.publicPath)));

    // monta todas las rutas bajo /api
    this.app.use("/api", this.routes);

    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on http://localhost:${this.port}`);
    });
  }
}

export async function app() {

  const mainRouter = Router();

  // /api/users/*
  mainRouter.use(userRoutes)
  // /api/categories/*
  mainRouter.use(categoryRoutes)
  // /api/programs/*
  mainRouter.use(programRoutes)
  // /api/universities/*
  mainRouter.use(universityRoutes)
  // /api/favourites/*
  mainRouter.use(favouriteRoutes)

  const server = new Server({
    port: Number(process.env.PORT) || 3000,
    routes: mainRouter,
    public_path: "public",
  });

  server.start();
}
