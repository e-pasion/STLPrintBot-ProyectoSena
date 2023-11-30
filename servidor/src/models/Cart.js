import { model,Schema } from "mongoose";

const cartSchema= new Schema({
    
    products:[{
        ref:"Product",type:Schema.Types.ObjectId
    }],
    codeUsed:{ref:"Code",type: Schema.Types.ObjectId},
    shipData:{
        firstName:{type:String},
        lastName:{type:String},
        address:{type:String},
        department:{type:String},
        city:{type:String},
        numberPhone:{type:String},
        optionalNotes:{type:String},
        estimatedDate:{type:Date},
        shipPrice:{type:Number}
    },
},{
    versionKey:false
})

export default model("Cart",cartSchema)