import { model,Schema } from "mongoose";

const codeSchema= new Schema({
    code:{type:String,require:true}
},{
    versionKey:false
})

export default model("Code",codeSchema)