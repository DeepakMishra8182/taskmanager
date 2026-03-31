import mongoose, { Schema } from "mongoose"

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
         type:String,
         required:true,
         minlength:6,
         trim:true
    },
    name:{
         type:String,
         required:true, 
         trim:true,
    }
},
{
    timestamps:true
}
)

export default mongoose.model('User',userSchema)