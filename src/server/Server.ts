import express, { Application, ErrorRequestHandler , Request, Response } from "express";
import { userRouter } from "../router/user.route";
import { config } from 'dotenv'; 
import cors from 'cors';
import { IServer } from "../interfaces/server/server.interface";
import { hotelRouter } from "../router/hotel.route";
import { connect } from "../database/databaseConnector.database";
import { romRouter } from "../router/room.route";
config();
export default class Server implements IServer{
  private app: Application;
  private domain: string
  private domain2: string
  constructor() {
    this.domain = process.env.DOMAIN as string
    this.domain2 = process.env.DOMAIN2 as string
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    connect() 
    console.log(this.domain, this.domain2)
  }

  configureMiddleware(): void {
    this.app.use(express.json());

    this.app.use(cors({
      origin:  [this.domain, this.domain2],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true 
    }));

    this.app.use(this.errorHandler);
  }

  configureRoutes(): void {
    userRouter(this.app);
    romRouter(this.app);
    hotelRouter(this.app);
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