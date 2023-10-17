import { Application, Router } from 'express'
import { ReservationControllers } from '../controllers/reservation.controllers'

const routerReservation = Router()

const reservationControllers = new ReservationControllers()

routerReservation.get("/",reservationControllers.findAll)
routerReservation.get("/:id",reservationControllers.findById)
routerReservation.post("/",reservationControllers.create)
routerReservation.patch("/:id",reservationControllers.update)
routerReservation.delete("/:id",reservationControllers.delete)

export const reservationRouter = (app: Application) => app.use("/api/v1/reservation", routerReservation)