import { Request, Response } from "express";
import { createReservation, deleteReservation, finAllReservation, findReservationById, updateReservation } from "../dataBaseManager/reservation";
import { IReservationControllers } from "../interfaces/reservation/reservationControllers.interface";

export class ReservationControllers implements IReservationControllers {

    async findAll(_req: Request, res: Response): Promise<Response> {
        try {
            const response = await finAllReservation();
            return res.status(200).json({
                response,
            });
        } catch (error) {
            return res.status(500).json({
                error: "Internal server error: " + error,
            });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const response = await findReservationById(id);
            return res.status(200).json({
                response,
            });
        } catch (error) {
            return res.status(500).json({
                error: "Internal server error: " + error,
            });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const reqBody = req.body;
            const response = await createReservation(reqBody);
            return res.status(201).json({ response });
        }
        catch (error) {
            return res.status(500).json({
                error: "Internal server error: " + error,
            });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            const body = req.body;
            const response = await updateReservation(id, body);
            return res.status(200).json({ response });
        }
        catch (error) {
            return res.status(500).json({
                error: "Internal server error: " + error,
            });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const response = await deleteReservation(id);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: "Internal server error: " + error,
            });
        }
    }
}