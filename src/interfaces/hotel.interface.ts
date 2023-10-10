import mongoose from "mongoose"

export interface IHotel {
    name: string
    description: string
    location: string
    contact: string
    rooms: mongoose.Schema.Types.ObjectId[]
}