import { Router } from 'express'
import { HotelControllers } from '../controllers/hotel.controlles'

const routerHotel = Router()

const hotelControllers = new HotelControllers()

routerHotel.get("/",hotelControllers.findAll)
routerHotel.get("/:id",hotelControllers.findById)
routerHotel.post("/",hotelControllers.create)
routerHotel.patch("/:id",hotelControllers.update)

export { routerHotel }