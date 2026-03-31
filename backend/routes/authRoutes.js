import express from 'express'
import { register,login,logout,getProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
const routes=express.Router()

routes.post('/register',register)
routes.post('/login',login)
routes.post('/logout',logout)
routes.get("/profile", protect, getProfile);

export default routes