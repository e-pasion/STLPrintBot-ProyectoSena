import { model,Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const detailSchema= new Schema({
    
    userId:{ref:"User",type: Schema.Types.ObjectId},
    products:[{
        ref:"Product",type:Schema.Types.ObjectId
    }],
    shipData:{
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        address:{type:String,required:true},
        city:{type:String,required:true},
        numberPhone:{type:String,required:true},
        optionalNotes:{type:String,required:false},
        estimatedDate:{type:String,required:true},
    },
    totalPrice:{type:Number, required:true},
    status:{type:String, default:'processing'}
},{
    timestamps:true,
    versionKey:false
})
detailSchema.plugin(mongoosePaginate);

export default model("Detail",detailSchema)