import mongoose, { Document } from "mongoose";


export interface IHotel extends Document {
    name: string
    description: string
    location: string
    contact: string
    category: mongoose.Schema.Types.ObjectId
    rooms: mongoose.Schema.Types.ObjectId[]
}

export interface IHotelFetch extends IHotel {
    _id: string
}