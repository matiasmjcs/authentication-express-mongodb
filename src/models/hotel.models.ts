import mongoose, { Schema } from "mongoose";
import { IHotelMongodb } from "../interfaces/hotel/hotel.interface";

const hotelSchema = new Schema<IHotelMongodb>({
    name: {type: String, require: true},
    description: {type: String, require: true},
    location: {type:String, require: true},
    contact: {type:String, require: true},
    rooms: [{type: mongoose.Schema.Types.ObjectId, ref: ["Room"]}],
})

const Hotel = mongoose.model("hotels",hotelSchema)

export default Hotel