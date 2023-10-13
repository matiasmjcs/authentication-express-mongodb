import { Application, Router } from 'express'
import { HotelControllers } from '../controllers/hotel.controllers'

const routerHotel = Router()

const hotelControllers = new HotelControllers()

routerHotel.get("/",hotelControllers.findAll)
routerHotel.get("/:id",hotelControllers.findById)
routerHotel.post("/",hotelControllers.create)
routerHotel.patch("/:id",hotelControllers.update)

export const hotelRouter = (app: Application) => app.use("/api/v1/hotel", routerHotel)