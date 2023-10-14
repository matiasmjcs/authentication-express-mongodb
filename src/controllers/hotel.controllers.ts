import { Request, Response } from "express";
import { createHotel, deleteHotel, FindHotelAll, FindHotelById, updateHotel } from "../dataBaseManager/hotel";
import { IHotelControllers } from "../interfaces/hotel/hotelControllers.interface";

export class HotelControllers implements IHotelControllers {
  /**
   * Finds all the hotels.
   *
   * @param {Request} _req - the request object
   * @param {Response} res - the response object
   * @return {Promise<Response>} the JSON response containing the hotel information
   */
  async findAll(_req: Request, res: Response): Promise<Response> {
    try {
      const response = await FindHotelAll()
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
   * Find a hotel by ID.
   *
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @return {Promise<Response>} a JSON response with the hotel information
   */
  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const response = await FindHotelById(id)
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
   * Creates a new hotel using the provided request body.
   *
   * @param {Request} req - The request object containing the hotel details.
   * @param {Response} res - The response object to send the result.
   * @return {Promise<Response>} A Promise that resolves when the hotel is created.
   */
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const reqBody = req.body
      const response = await createHotel(reqBody)
      return res.status(201).json({ response })
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error: " + error,
      });
    }
  }
  /**
   * Updates a hotel with the given ID and body.
   *
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @return {Promise<Response>} - a promise that resolves when the update is complete
   */
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const body = req.body
      const response = await updateHotel(id, body)
      return res.status(200).json({ response })
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error: " + error,
      });
    }
  }

  /**
   * Deletes a hotel by its ID.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @return {Promise<Response>} The response object.
   */
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const response = await deleteHotel(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Internal server error: " + error,
      });
    }
  }

}