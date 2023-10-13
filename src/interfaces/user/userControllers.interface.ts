import { Request, Response } from "express";
export interface IUserControllers {
    signUp(req: Request, res: Response): Promise<Response>;
    login(req: Request, res: Response): Promise<Response>;
    logout(req: Request,res: Response): Promise<Response>;
  }