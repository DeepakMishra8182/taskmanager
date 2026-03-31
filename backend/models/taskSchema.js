import mongoose, { Schema } from "mongoose";

const taskSchema=new Schema({
  title:{
    type:String,
    required:true,
  },
  completed:{
    type:Boolean,
    default:false
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  }
},
{
    timestamps:true
}
)

export default mongoose.model('Task',taskSchema)