import mongoose from "mongoose";
import { IReservation } from "../interfaces/reservation/reservation.interface";

const reservationSchema = new mongoose.Schema<IReservation>({
    hotel: {type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'},
    room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    startDate: Date,
    endDate: Date,
    price: Number,
    status: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    Comments: String,
})

export const Reservation = mongoose.model("reservation", reservationSchema)