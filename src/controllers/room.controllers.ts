import { Request, Response } from "express"
import { FindRoomAll, FindRoomById, createRoom, deleteRoom, updateRoom } from "../dataBaseManager/room"
import { IRoomControllers } from "../interfaces/room/roomControllers.interface"

export class RoomControllers implements IRoomControllers {

  async findAll(_req: Request, res: Response): Promise<Response> {
    try {
      const response = await FindRoomAll()
      return res.status(200).json({
        response
      })
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error: " + error,
      });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const response = await FindRoomById(id)
      return res.status(200).json({
        response
      })
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error: " + error,
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    const reqBody = req.body
    const response = await createRoom(reqBody)
    return res.status(201).json({ response })
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const body = req.body
      const response = await updateRoom(id, body)
      return res.status(200).json({ response })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Internal server error: " + error,
      });
    }
  }
 
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const response = await deleteRoom(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Internal server error: " + error,
      });
    }
  }
}