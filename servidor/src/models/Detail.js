import { model,Schema } from "mongoose";

const detailSchema= new Schema({
    
    userId:{ref:"User",type: Schema.Types.ObjectId},
    products:[{
        ref:"Product",type:Schema.Types.ObjectId
    }],
    totalPrice:{type:Number, required:true},
    buyDate:{type:Date, required:true}
},{
    versionKey:false
})

export default model("Detail",detailSchema)