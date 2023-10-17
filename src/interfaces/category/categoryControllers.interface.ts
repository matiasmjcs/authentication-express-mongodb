import { Request, Response } from "express";

export interface IcategoryControllers {
    findAll(req: Request, res: Response): Promise<Response>;
    findById(req: Request, res: Response): Promise<Response>;
    create(req: Request, res: Response): Promise<Response>;
    update(req: Request, res: Response): Promise<Response>;
    delete(req: Request, res: Response): Promise<Response>;
}