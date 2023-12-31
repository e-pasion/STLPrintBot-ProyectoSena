import { model,Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const codeSchema= new Schema({
    code:{type:String,require:true},
    finalDate:{type:Date,require:true},
    discount:{type:Number,require:true},
    status:{type:Boolean, default:true}
},{
    versionKey:false
})
codeSchema.plugin(mongoosePaginate);

export default model("Code",codeSchema)