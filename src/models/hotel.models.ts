import mongoose, { Schema } from "mongoose";
import { IHotel } from "../interfaces/hotel.interface";

const hotelSchema = new Schema<IHotel>({
    name: {type: String, require: true},
    description: {type: String, require: true},
    location: {type:String, require: true},
    contact: {type:String, require: true},
    rooms: [{type: mongoose.Schema.Types.ObjectId, ref: ["Room"]}],
})

const Hotel = mongoose.model("hotels",hotelSchema)