import { Request, Response } from "express";
export interface IUserService {
    signUp(req: Request, res: Response): Promise<Response>;
    login(req: Request, res: Response): Promise<Response>;
    logout(res: Response): Promise<Response>;
  }