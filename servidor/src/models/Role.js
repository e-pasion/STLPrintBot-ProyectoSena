import { model,Schema } from "mongoose";

const roleSchema= new Schema({
    name:{type:String,require:true}
},{
    versionKey:false
})

export default model("Role",roleSchema)