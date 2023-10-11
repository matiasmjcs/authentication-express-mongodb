import { Request, Response } from "express"
import { FindRoomAll, FindRoomById, createRoom, updateRoom } from "../dataBaseManager/room"
import { IRoomControllers } from "../interfaces/room/roomControllers.interface"

export class RoomControllers implements IRoomControllers {
    async findAll(_req: Request, res: Response) {
        const response = await FindRoomAll()
        return res.json({
          response
        })
      }
      async findById(req: Request, res: Response) {
        const { id } = req.params
        const response = await FindRoomById(id)
        return res.json({
          response
        })
      }
      async create(req: Request, res: Response) {
        const reqBody = req.body
        const response = await createRoom(reqBody)
        return res.json({ response })
      }
      async update(req: Request, res: Response) {
        const { id } = req.params
        const body = req.body
        const response = await updateRoom(id, body)
        return res.json({ response })
      }
}