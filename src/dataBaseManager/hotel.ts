import { IHotelMongodbFetch } from "../interfaces/hotel.interface"
import Hotel from "../models/hotel.models"

export const FindHotelAll = async() => {
    try {
        const hotels = await Hotel.find()
        if(!hotels) {throw new Error("no se a encontrado la lista de hoteles")}
        return hotels
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: FindHotelAll Internal server error" + error,
          };
    }
}

export const FindHotelById = async(id: string) => {
    try {
        const hotel = await Hotel.findOne({_id:id})
        if(!hotel) {throw new Error("no se a encontrado el hotel")}
        return hotel
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: FindHotelById Internal server error" + error,
          };
    }
}

export const createHotel = async (hotel:IHotelMongodbFetch) => {
    try {
        const hotelVerify = await Hotel.findOne({_id:hotel._id})
        if(hotelVerify) {throw new Error("este hotel ya existe")}
        const newHotel = new Hotel({
            name: hotel.name,
            description: hotel.description,
            location: hotel.location,
            contact: hotel.contact
        })
        const saveHotel = await newHotel.save()
        if(!saveHotel){throw new Error("a ocurrido un error al generar el hotel")}
        return { success: true, hotel: saveHotel };
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: createHotel Internal server error" + error,
          };
    }
}