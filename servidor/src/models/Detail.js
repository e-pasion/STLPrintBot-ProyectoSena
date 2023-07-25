import { model,Schema } from "mongoose";

const detailSchema= new Schema({
    
    userId:{ref:"User",type: Schema.Types.ObjectId},
    products:[{
        ref:"Product",type:Schema.Types.ObjectId
    }],
    shipData:{
        firstName:{type:string,required:true},
        lastName:{type:string,required:true},
        address:{type:string,required:true},
        city:{type:string,required:true},
        numberPhone:{type:string,required:true},
        optionalNotes:{type:string,required:false},
    },
    totalPrice:{type:Number, required:true},
    buyDate:{type:Date, required:true}
},{
    versionKey:false
})

export default model("Detail",detailSchema)