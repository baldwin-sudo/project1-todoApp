import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        
        required:true
    },
    body:{
        type:String,
        
        required:true
    },
    user:
        {
        type:mongoose.Types.ObjectId,
        ref:"User"}
        },{timestamps:true})


 const Task = mongoose.model('Task',taskSchema);

 export default Task ;