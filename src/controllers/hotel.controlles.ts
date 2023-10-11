import { Request, Response } from "express";

import { initializeDatabaseManager } from "../dataBaseManager/user";
import { createHotel, FindHotelAll, FindHotelById } from "../dataBaseManager/hotel";

export class HotelControllers {
    constructor() {
        initializeDatabaseManager()
      }
      async findAll(_req: Request, res:Response) {
        const response = await FindHotelAll()
        return res.json({
          response
        })
      }
      async findById(req: Request, res:Response) {
        const params = req.params
        const {id} = params
        const response = await FindHotelById(id)
        return res.json({
          response
        })
      }
      async create(req: Request, res:Response) {
        const reqBody = req.body
        const response = await createHotel(reqBody)
        return res.json({response})
      }
      async update(req: Request, res:Response) {
        return res.json({msg:"update hotel"})
      }
}