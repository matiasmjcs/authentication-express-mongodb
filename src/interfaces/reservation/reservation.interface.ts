import mongoose, { Document } from "mongoose";


export interface IReservation extends Document {
    hotel: mongoose.Schema.Types.ObjectId;
    room: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    price: Number;
    status: String;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    Comments: String;
}