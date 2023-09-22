import { Router } from 'express'
import { UserService } from '../controllers/user.controllers'
 '../controllers/notes.controllers'

const routerUser = Router()

const userService = new UserService()

routerUser.post('/singup', userService.signUp)
routerUser.post('/login', userService.login)
routerUser.post('/logout', userService.logout)
export { routerUser }