import mongoose, { Document } from "mongoose";


export interface IHotelMongodb {
    name: string
    description: string
    location: string
    contact: string
    rooms: mongoose.Schema.Types.ObjectId[]
}

export interface IHotel extends Omit<IHotelMongodb,"rooms"> {}

export interface IHotelMongodbFetch extends Document, IHotelMongodb {
    _id: string
}