import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,lowercase:true},
    age:{type:Number,required:true},
    password:{type:String,required:true}
},{ timestamps: true })

export const User = mongoose.models.User || mongoose.model('User',userSchema);