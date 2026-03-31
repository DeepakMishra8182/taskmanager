import express from 'express'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js'
import taskRouter from './routes/taskRoutes.js'
import dotenv from 'dotenv'

const app=express()

app.use(cookieParser());
app.use(express.json())
dotenv.config()
const PORT=process.env.PORT || 3000

connectDb()

app.use('/api/auth',authRoutes)
app.use('/tasks',taskRouter)

app.get('/',(req,res)=>{
    res.send('hello how are you')
})

app.listen(PORT,()=>{
    console.log('server is running on port 3000')
})