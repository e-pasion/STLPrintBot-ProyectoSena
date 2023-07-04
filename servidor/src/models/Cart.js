import { model,Schema } from "mongoose";

const cartSchema= new Schema({
    
    userId:{ref:"User",type: Schema.Types.ObjectId},
    products:[{
        ref:"Product",type:Schema.Types.ObjectId
    }]
},{
    versionKey:false
})

export default model("Cart",cartSchema)