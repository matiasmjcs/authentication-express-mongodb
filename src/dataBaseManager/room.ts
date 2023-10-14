import { errorCatch } from "../interfaces/errorCatch/errorCatch.interface";
import { IRoom } from "../interfaces/room/room.interface";
import Hotel from "../models/hotel.models";
import Room from "../models/room.models";

/**
 * Retrieves all rooms from the database.
 *
 * @return {Promise<Room[] | { success: boolean, error: string }>} The list of rooms, or an error object if an error occurred.
 */
export const FindRoomAll = async (): Promise<IRoom[] | errorCatch> => {
    try {
        const rooms = await Room.find()
        if (!rooms) { throw new Error("no se a encontrado la lista de habitaciones") }
        return rooms
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: FindRoomAll Internal server error" + error,
        };
    }
}

/**
 * Retrieves a room from the database based on the provided ID.
 *
 * @param {string} id - The ID of the room to retrieve.
 * @return {Promise<Room | { success: boolean, error: string }>} - The retrieved room or an error object.
 */
export const FindRoomById = async (id: string): Promise<IRoom | errorCatch> => {
    try {
        const room = await Room.findOne({ _id: id })
        if (!room) { throw new Error("no se a encontrado la habitacion") }
        return room
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: FindRoomById Internal server error" + error,
        };
    }
}

/**
 * Create a new room in the database.
 *
 * @param {IRoom} room - The room object to be created.
 * @return {Promise<{success: boolean, room: IRoom} | {success: boolean, error: string}>} 
 *         A promise that resolves to an object containing the success status and the created room,
 *         or an object with the success status and an error message.
 */
export const createRoom = async (room: IRoom): Promise<{ success: boolean; room: IRoom; } | errorCatch> => {
    try {
        const roomCheck = await Room.findOne({ roomNumber: room.roomNumber })
        const hotelCheck = await Hotel.findById(room.hotel)
        if (!hotelCheck) { throw new Error("no se a encontrado el hotel") }
        if (roomCheck) { throw new Error("esta habitacion ya existe") }
        const newRoom = new Room({
            roomNumber: room.roomNumber,
            roomType: room.roomType,
            pricePerNight: room.pricePerNight,
            description: room.description,
            images: room.images,
            availableDates: room.availableDates,
            amenities: room.amenities,
            capacity: room.capacity,
            isClean: room.isClean,
            hotel: room.hotel
        })
        const saveRoom = await newRoom.save()
        if (!saveRoom) { throw new Error("a ocurrido un error al generar la habitacion") }
        return { success: true, room: saveRoom }
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: createRoom Internal server error" + error,
        };
    }
}

/**
 * Updates a room in the database.
 *
 * @param {string} id - The ID of the room to be updated.
 * @param {IRoom} updatedData - The updated data for the room.
 * @return {Promise<{ success: boolean, room: IRoom } | { success: boolean, error: string }>} - Returns a promise that resolves to either the updated room object or an error message.
 */
export const updateRoom = async (id: string, updatedData: IRoom): Promise<{ success: boolean; room: IRoom; } | errorCatch> => {
    try {
        const room = await Room.findOne({ _id: id });
        if (!room) {
            throw new Error("No se ha encontrado la habitacion a actualizar");
        }

        if (updatedData.roomNumber) room.roomNumber = updatedData.roomNumber;
        if (updatedData.roomType) room.roomType = updatedData.roomType;
        if (updatedData.pricePerNight) room.pricePerNight = updatedData.pricePerNight;
        if (updatedData.description) room.description = updatedData.description;
        if (updatedData.images) room.images = updatedData.images;
        if (updatedData.availableDates) room.availableDates = updatedData.availableDates;
        if (updatedData.amenities) room.amenities = updatedData.amenities;
        if (updatedData.capacity) room.capacity = updatedData.capacity;
        updatedData.isClean ? room.isClean = updatedData.isClean : room.isClean = false;
        if (updatedData.hotel) room.hotel = updatedData.hotel;


        const updatedRoom = await room.save();

        if (!updatedRoom) {
            throw new Error("Ocurrió un error al actualizar la habitacion");
        }

        return { success: true, room: updatedRoom };
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: updateRoom Internal server error" + error,
        };
    }
}

/**
 * Deletes a room from the database.
 *
 * @param {string} id - The ID of the room to delete.
 * @return {Promise<{ success: boolean, message?: string, error?: string }>} - A promise that resolves to an object with a success boolean indicating if the room was deleted successfully, and an optional message or error string.
 */
export const deleteRoom = async (id: string): Promise<{ success: boolean; message?: string; error?: string; }> => {
    try {
        const room = await Room.findOneAndDelete({ _id: id });

        if (!room) {
            throw new Error("No se ha encontrado la habitación para eliminar");
        }

        return { success: true, message: "Habitación eliminada exitosamente" };
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: deleteRoom Internal server error" + error,
        };
    }
}

