import { Router } from 'express'
import { UserControllers } from '../controllers/user.controllers'
 '../controllers/notes.controllers'

const routerUser = Router()

const userControllers = new UserControllers()

routerUser.post('/signup', userControllers.signUp)
routerUser.post('/login', userControllers.login)
routerUser.post('/logout', userControllers.logout)
export { routerUser }