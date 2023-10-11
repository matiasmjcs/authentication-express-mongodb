import express, { Application, ErrorRequestHandler , Request, Response } from "express";
import { routerUser } from "../router/user.route";
import { config } from 'dotenv'; 
import cors from 'cors';
import { IServer } from "../interfaces/server/server.interface";
import { routerHotel } from "../router/hotel.route";
import { connect } from "../database/databaseConnector.database";
import { routerRoom } from "../router/room.route";
config();
export default class Server implements IServer{
  private app: Application;
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    connect()
  }

  configureMiddleware(): void {
    this.app.use(express.json());

    this.app.use(cors({
      origin: process.env.DOMAIN,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true 
    }));

    this.app.use(this.errorHandler);
  }

  configureRoutes(): void {
    this.app.use("/api/v1/user", routerUser);
    this.app.use("/api/v1/hotel", routerHotel);
    this.app.use("/api/v1/room", routerRoom);
  }

  errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: express.NextFunction) => {
    console.error("An error occurred:", err);
    res.status(500).send("Internal Server Error");
  }

   start(): void {
    const port = process.env.PORT; 
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}