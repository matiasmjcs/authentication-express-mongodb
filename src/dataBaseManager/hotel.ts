import { errorCatch } from "../interfaces/errorCatch/errorCatch.interface"
import { IHotelMongodb, IHotelMongodbFetch } from "../interfaces/hotel/hotel.interface"
import Hotel from "../models/hotel.models"

/**
 * Retrieves all hotels from the database.
 * @dev This function is used to retrieve all hotels from the database.
 * @return {Promise<Array<Hotel>>} The list of hotels.
 */
export const FindHotelAll = async (): Promise<{ success: true, hotels: Array<IHotelMongodbFetch> } | errorCatch> => {
    try {
        const hotels: Array<IHotelMongodbFetch> = await Hotel.find()
        if (!hotels) { throw new Error("no se a encontrado la lista de hoteles") }
        return { success: true, hotels };
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: FindHotelAll Internal server error" + error,
        };
    }
}

/**
 * Finds a hotel by its ID.
 * @dev This function is used to find a hotel by its ID.
 * @param {string} id - The ID of the hotel.
 * @return {Promise<Object|Hotel>} Returns a promise that resolves to the hotel object if found, otherwise returns an object with success set to false and an error message.
 */
export const FindHotelById = async (id: string): Promise<{ success: boolean; hotel: IHotelMongodb } | errorCatch> => {
    try {
        const hotel: IHotelMongodbFetch | null = await Hotel.findOne({ _id: id })
        if (!hotel) { throw new Error("no se a encontrado el hotel") }
        return { success: true, hotel };
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: FindHotelById Internal server error" + error,
        };
    }
}

/**
 * Creates a new hotel in the database.
 *
 * @param {IHotelMongodb} hotel - The hotel object to be created.
 * @return {Promise<{ success: boolean, hotel: IHotelMongodb } | { success: boolean, error: string }>} - Returns a promise that resolves to an object containing either the newly created hotel or an error message.
 */
export const createHotel = async (hotel: IHotelMongodb): Promise<{ success: boolean; hotel: IHotelMongodb } | { success: boolean; error: string }> => {
    try {
        const hotelVerify = await Hotel.findOne({ name: hotel.name })
        if (hotelVerify) { throw new Error("este hotel ya existe") }
        const newHotel = new Hotel({
            name: hotel.name,
            description: hotel.description,
            location: hotel.location,
            contact: hotel.contact
        })
        const saveHotel = await newHotel.save()
        if (!saveHotel) { throw new Error("a ocurrido un error al generar el hotel") }
        return { success: true, hotel: saveHotel };
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: createHotel Internal server error" + error,
        };
    }
}

/**
 * Updates a hotel in the database.
 *
 * @param {string} id - The ID of the hotel to update.
 * @param {IHotelMongodb} updatedData - The updated data for the hotel.
 * @return {Promise<{success: boolean, hotel?: IHotelMongodb, error?: string}>} - A promise that resolves to an object with the success status, updated hotel, or error message.
 */
export const updateHotel = async (id: string, updatedData: IHotelMongodb): Promise<{ success: boolean; hotel?: IHotelMongodb; error?: string }> => {
    try {
        const hotel = await Hotel.findOne({ _id: id });
        if (!hotel) {
            throw new Error("No se ha encontrado el hotel a actualizar");
        }

        if(updatedData.name )hotel.name = updatedData.name;
        if (updatedData.description)hotel.description = updatedData.description;
        if(updatedData.location)hotel.location = updatedData.location;
        if(updatedData.contact)hotel.contact = updatedData.contact;

        const updatedHotel = await hotel.save();

        if (!updatedHotel) {
            throw new Error("Ocurrió un error al actualizar el hotel");
        }

        return { success: true, hotel: updatedHotel };
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: updateHotel Internal server error" + error,
        };
    }
}

/**
 * Deletes a hotel from the database.
 *
 * @param {string} id - The ID of the hotel to be deleted.
 * @return {Promise<Object>} An object indicating the success or failure of the operation.
 */
export const deleteHotel = async (id: string): Promise<object> => {
    try {
        const hotel = await Hotel.findOneAndDelete({ _id: id });

        if (!hotel) {
            throw new Error("No se ha encontrado el hotel para eliminar");
        }

        return { success: true, message: "Hotel eliminado exitosamente" };
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: deleteHotel Internal server error" + error,
        };
    }
}
