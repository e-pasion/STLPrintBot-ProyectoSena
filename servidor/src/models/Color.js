import { model,Schema } from "mongoose";

const colorSchema= new Schema({
    name:{type:String,require:true},
    code:{type:String,require:true},
    status:{type:Boolean,default:true}
},{
    versionKey:false
})

export default model("Color",colorSchema)