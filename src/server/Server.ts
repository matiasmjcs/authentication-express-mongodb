import express, { Application } from "express";
import { routerUser } from "../router/user.route";
import { config } from 'dotenv'; 
import cors from 'cors';
config();
export default class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
  }

  configureMiddleware(): void {
    this.app.use(express.json());

    // Configurar CORS para permitir solicitudes desde http://localhost:5173
    this.app.use(cors({
      origin: 'http://localhost:5173',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true // Si estás utilizando cookies o sesiones
    }));

    this.app.use(this.errorHandler); // Agregar middleware de manejo de errores
  }

  configureRoutes(): void {
    this.app.use("/users", routerUser);
  }

  errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction): void {
    console.error("An error occurred:", err);
    res.status(500).send("Internal Server Error");
  }

   start(): void {
    const port = process.env.PORT; // Usar un puerto especÃ­fico o el valor por defecto
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}