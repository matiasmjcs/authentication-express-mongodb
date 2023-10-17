import { IRoom } from "../interfaces/room/room.interface";
import Hotel from "../models/hotel.models";
import Room from "../models/room.models";


export const FindRoomAll = async (): Promise<IRoom[] | {error: string}> => {
    try {
        const rooms = await Room.find()
        if (!rooms) { throw new Error("no se a encontrado la lista de habitaciones") }
        return rooms
    } catch (error) {
        return {
            error: "DatabaseManager: FindRoomAll Internal server error" + error,
        };
    }
}


export const FindRoomById = async (id: string): Promise<IRoom | {error: string}> => {
    try {
        const room = await Room.findOne({ _id: id })
        if (!room) { throw new Error("no se a encontrado la habitacion") }
        return room
    } catch (error) {
        return {
            error: "DatabaseManager: FindRoomById Internal server error" + error,
        };
    }
}


export const createRoom = async (room: IRoom): Promise<{room: IRoom; } | {error:string}> => {
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
        return { room: saveRoom }
    } catch (error) {
        return {
            error: "DatabaseManager: createRoom Internal server error" + error,
        };
    }
}


export const updateRoom = async (id: string, updatedData: IRoom): Promise<{ room: IRoom; } | {error:string}> => {
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

        return { room: updatedRoom };
    } catch (error) {
        return {
            error: "DatabaseManager: updateRoom Internal server error" + error,
        };
    }
}


/**
 * Deletes a room from the database.
 *
 * @param {string} id - The id of the room to be deleted.
 * @return {Promise<{ message?: string; error?: string; }>} - A promise that resolves to an object with a message property if the room is deleted successfully, or an error property if there is an internal server error.
 */
export const deleteRoom = async (id: string): Promise<{ message?: string; error?: string; }> => {
    try {
        const room = await Room.findOneAndDelete({ _id: id });

        if (!room) {
            throw new Error("No se ha encontrado la habitación para eliminar");
        }

        return { message: "Habitación eliminada exitosamente" };
    } catch (error) {
        return {
            error: "DatabaseManager: deleteRoom Internal server error" + error,
        };
    }
}

