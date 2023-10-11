import { Request, Response } from "express";

export interface IRoomControllers {
    findAll(_req: Request, res: Response): Promise<Response>;
    findById(req: Request, res: Response): Promise<Response>;
    create(req: Request, res: Response): Promise<Response>;
    update(req: Request, res: Response): Promise<Response>;
}

