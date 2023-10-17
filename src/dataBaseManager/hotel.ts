import { IHotel, IHotelFetch } from "../interfaces/hotel/hotel.interface"
import Hotel from "../models/hotel.models"


export const FindHotelAll = async (): Promise<{ hotels: Array<IHotelFetch> } | { error: string }> => {
    try {
        const hotels: Array<IHotelFetch> = await Hotel.find()
        if (!hotels) { throw new Error("no se a encontrado la lista de hoteles") }
        return { hotels };
    } catch (error) {
        return {
            error: "DatabaseManager: FindHotelAll Internal server error" + error,
        };
    }
}



export const FindHotelById = async (id: string): Promise<{ hotel: IHotel } | { error: string }> => {
    try {
        const hotel: IHotelFetch | null = await Hotel.findOne({ _id: id })
        if (!hotel) { throw new Error("no se a encontrado el hotel") }
        return { hotel };
    } catch (error) {
        return {
            error: "DatabaseManager: FindHotelById Internal server error" + error,
        };
    }
}


export const createHotel = async (hotel: IHotel): Promise<{hotel: IHotelFetch } | { error: string }> => {
    try {
        const hotelVerify = await Hotel.findOne({ name: hotel.name })
        if (hotelVerify) { throw new Error("este hotel ya existe") }
        const newHotel = new Hotel({
            name: hotel.name,
            description: hotel.description,
            location: hotel.location,
            contact: hotel.contact,
            category: hotel.category,
            rooms: []
        })
        const saveHotel = await newHotel.save()
        if (!saveHotel) { throw new Error("a ocurrido un error al generar el hotel") }
        return {hotel: saveHotel };
    } catch (error) {
        return {
            error: "DatabaseManager: createHotel Internal server error" + error,
        };
    }
}


export const updateHotel = async (id: string, updatedData: IHotel): Promise<{ hotel?: IHotel; error?: string }> => {
    try {
        const hotel = await Hotel.findOne({ _id: id });
        if (!hotel) {
            throw new Error("No se ha encontrado el hotel a actualizar");
        }

        if(updatedData.name )hotel.name = updatedData.name;
        if (updatedData.description)hotel.description = updatedData.description;
        if(updatedData.location)hotel.location = updatedData.location;
        if(updatedData.contact)hotel.contact = updatedData.contact;
        if(updatedData.category)hotel.category = updatedData.category;

        const updatedHotel = await hotel.save();

        if (!updatedHotel) {
            throw new Error("Ocurrió un error al actualizar el hotel");
        }

        return { hotel: updatedHotel };
    } catch (error) {
        return {
            error: "DatabaseManager: updateHotel Internal server error" + error,
        };
    }
}


export const deleteHotel = async (id: string): Promise<object> => {
    try {
        const hotel = await Hotel.findOneAndDelete({ _id: id });
        if (!hotel) {
            throw new Error("No se ha encontrado el hotel para eliminar");
        }
        return { message: "Hotel eliminado exitosamente" };
    } catch (error) {
        return {
            error: "DatabaseManager: deleteHotel Internal server error" + error,
        };
    }
}
