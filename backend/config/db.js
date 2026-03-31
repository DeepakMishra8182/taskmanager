import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.DATABASE)
        console.log('database connected successfully')
    } catch (error) {
     console.log(error)
     process.exit()   
    }
}
export default connectDb