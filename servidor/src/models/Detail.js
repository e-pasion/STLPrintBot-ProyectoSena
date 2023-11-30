import { model,Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const detailSchema= new Schema({
    cartUsed:{ref:"Cart",type: Schema.Types.ObjectId},
    userId:{ref:"User",type: Schema.Types.ObjectId},   
    totalPrice:{type:Number, required:true},
    status:{type:String, default:'processing'}
},{
    timestamps:true,
    versionKey:false
})
detailSchema.plugin(mongoosePaginate);

export default model("Detail",detailSchema)