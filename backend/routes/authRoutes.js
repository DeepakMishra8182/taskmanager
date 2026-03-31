import express from 'express'

import { register,login,logout } from '../controllers/userController.js'

const routes=express.Router()

routes.post('/register',register)
routes.post('/login',login)
routes.post('/logout',logout)

export default routes