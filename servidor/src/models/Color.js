import { model,Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


const colorSchema= new Schema({
    name:{type:String,require:true},
    code:{type:String,require:true},
    status:{type:Boolean,default:true}
},{
    versionKey:false
})
colorSchema.plugin(mongoosePaginate);

export default model("Color",colorSchema)