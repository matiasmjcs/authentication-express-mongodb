import { Request, Response } from "express";

import { initializeDatabaseManager } from "../services/DatabaseManager";

export class HotelControllers {
    constructor() {
        initializeDatabaseManager()
      }
      async getInfoHotel(req: Request, res:Response) {
        return res.json({
            msg: "get info hotel"
        })
      }
      async createHotel(req: Request, res:Response) {
        return "create hotel"
      }
      async updateHotel(req: Request, res:Response) {
        return "update hotel"
      }
}