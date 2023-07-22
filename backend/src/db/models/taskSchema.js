const mongoose =require("mongoose");

//defining schema
const date = new Date()

const taskSchema = new mongoose.Schema({
   
    title:{type:String,required:true,trim:true},
    description:{type:String,required:true,trim:true},
    priority:{type:Number}, 
    completed:{type:Boolean,required:true},
    useremail:{type:String,required:true},
    createdAt:{type:String,default:date},
    dueDate:{type:Number,},
    updatedAt:{type:Number}, 
})


//model

const userModel = mongoose.model("task",taskSchema)
module.exports = userModel;