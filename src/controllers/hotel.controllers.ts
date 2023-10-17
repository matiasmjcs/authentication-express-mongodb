import { Request, Response } from "express";
import { createHotel, deleteHotel, FindHotelAll, FindHotelById, updateHotel } from "../dataBaseManager/hotel";
import { IHotelControllers } from "../interfaces/hotel/hotelControllers.interface";

export class HotelControllers implements IHotelControllers {

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