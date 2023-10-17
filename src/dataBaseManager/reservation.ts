import { IReservationCreate } from "../interfaces/reservation/reservation.interface";
import { Reservation } from "../models/reservation";
import User from "../models/user.models";
import Room from "../models/room.models";
import Hotel from "../models/hotel.models";
export const finAllReservation = async () => {
    try {
        const reservations = await Reservation.find();
        if (!reservations) {
            throw new Error("no se a encontrado la lista de reservas")
        }
        return reservations
    } catch (error) {
        return "DatabaseManager: findAllReservation Internal server error" + error
    }
}

export const findReservationById = async (id: string) => {
    try {
        const reservation = await Reservation.findById(id);
        if (!reservation) {
            throw new Error("no se a encontrado la reserva")
        }
        return reservation
    } catch (error) {
        return "DatabaseManager: findReservationById Internal server error" + error
    }
}

export const createReservation = async (reservation: IReservationCreate) => {
    try {
        const user = await User.findById(reservation.user);
        if (!user) {
            throw new Error("no se a encontrado el usuario")
        }
        const room = await Room.findById(reservation.room);
        if (!room) {
            throw new Error("no se a encontrado la habitacion")
        }
        const hotel = await Hotel.findById(reservation.hotel);
        if (!hotel) {
            throw new Error("no se a encontrado el hotel")
        }
        const newReservation = await Reservation.create({
            hotel: reservation.hotel,
            room: reservation.room,
            user: reservation.user,
            startDate: reservation.startDate,
            endDate: reservation.endDate,
            price: reservation.price,
            status: reservation.status,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null,
            Comments: reservation.Comments
        });
        if(!newReservation) {
            throw new Error("no se a creado la nueva reserva")
        }
        return newReservation
    } catch (error) {
        return "DatabaseManager: createReservation Internal server error" + error
    }
}

export const updateReservation = async (id: string, reservation: IReservationCreate) => {
    try {
        const reservationToUpdate = await Reservation.findOne({ _id: id });

        if (!reservationToUpdate) {
            throw new Error("No se ha encontrado la habitación para actualizar");
        }

        if (reservation.hotel) reservationToUpdate.hotel = reservation.hotel;
        if (reservation.room) reservationToUpdate.room = reservation.room;
        if (reservation.user) reservationToUpdate.user = reservation.user;
        if (reservation.startDate) reservationToUpdate.startDate = reservation.startDate;
        if (reservation.endDate) reservationToUpdate.endDate = reservation.endDate;
        if (reservation.price) reservationToUpdate.price = reservation.price;
        if (reservation.status) reservationToUpdate.status = reservation.status;
        if (reservation.Comments) reservationToUpdate.Comments = reservation.Comments;
        reservationToUpdate.updatedAt = new Date();

        const updatedReservation = await reservationToUpdate.save();

        if (!updatedReservation) {
            throw new Error("No se ha actualizado la reserva");
        }

        return updatedReservation;
    } catch (error) {
        return "DatabaseManager: updateReservation Internal server error" + error;
    }
}


export const deleteReservation = async (id: string) => {
    try {
        const reservationToDelete = await Reservation.findOne({ _id: id })
        if (!reservationToDelete) {
            throw new Error("No se ha encontrado la habitación para eliminar");
        }
        const deleteReservation = await reservationToDelete.deleteOne()
        return deleteReservation
    } catch (error) {
        return "DatabaseManager: deleteReservation Internal server error" + error
    }
}