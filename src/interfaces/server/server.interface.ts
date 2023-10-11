import express, { ErrorRequestHandler } from "express";

export interface IServer {
  configureMiddleware(): void;
  configureRoutes(): void;
  errorHandler(err: ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction): void;
  start(): void;
}