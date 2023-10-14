import { Request, Response } from "express"
import { FindRoomAll, FindRoomById, createRoom, deleteRoom, updateRoom } from "../dataBaseManager/room"
import { IRoomControllers } from "../interfaces/room/roomControllers.interface"

export class RoomControllers implements IRoomControllers {
  /**
   * Find all the rooms.
   *
   * @param {Request} _req - the request object
   * @param {Response} res - the response object
   * @return {Promise<Response>} - a promise that resolves with the JSON response
   */
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
  /**
   * Finds a record by ID.
   *
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @return {Promise<Response>} - a promise that resolves to void
   */
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
  /**
   * Creates a room.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @return {Promise<Response>} The JSON response containing the created room.
   */
  async create(req: Request, res: Response): Promise<Response> {
    const reqBody = req.body
    const response = await createRoom(reqBody)
    return res.status(201).json({ response })
  }
  /**
   * Updates a room with the given ID.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @return {Promise<Response>} The updated room response.
   */
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
  /**
   * Deletes a room.
   *
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @return {Promise<Response>} the JSON response
   */
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