import { Router } from 'express'
import { RoomControllers } from '../controllers/room.controllers'

const routerRoom = Router()

const roomControllers = new RoomControllers()

routerRoom.get("/",roomControllers.findAll)
routerRoom.get("/:id",roomControllers.findById)
routerRoom.post("/",roomControllers.create)
routerRoom.patch("/:id",roomControllers.update)

export { routerRoom }