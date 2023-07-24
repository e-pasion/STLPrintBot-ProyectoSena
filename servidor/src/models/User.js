import { model,Schema } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema= new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pathImage:{type:String,required:true},
    roles:[{
        ref:"Role",
        type: Schema.Types.ObjectId
    }],
    codesUsed:[{
        ref:"Code",
        type: Schema.Types.ObjectId
    }]

},{
    versionKey:false
})

    userSchema.statics.encryptPassword = async (password) =>{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
    }

    userSchema.statics.comparePassword = async (password,receivedPassword) =>{
        return await bcrypt.compare(password,receivedPassword)
    }


export default model("User",userSchema)