import { Application, Router } from 'express'
import { CategoryControllers } from '../controllers/category.controllers'

const routerCategory = Router()

const categoryControllers = new CategoryControllers()

routerCategory.get("/",categoryControllers.findAll)
routerCategory.get("/:id",categoryControllers.findById)
routerCategory.post("/",categoryControllers.create)
routerCategory.patch("/:id",categoryControllers.update)
routerCategory.delete("/:id",categoryControllers.delete)

export const categoryRouter = (app: Application) => app.use("/api/v1/category", routerCategory)