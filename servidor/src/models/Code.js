import { model,Schema } from "mongoose";

const codeSchema= new Schema({
    code:{type:String,require:true},
    startDate:{type:Date,require:true},
    finalDate:{type:Date,require:true},
    status:{type:Boolean}
},{
    versionKey:false
})

export default model("Code",codeSchema)