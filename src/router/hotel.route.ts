import { Router } from 'express'
import { HotelControllers } from '../controllers/hotel.controlles'

const routerHotel = Router()

const hotelControllers = new HotelControllers()

export { routerHotel }