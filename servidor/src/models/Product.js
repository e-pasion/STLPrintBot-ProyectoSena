import { model,Schema } from "mongoose";

const productSchema= new Schema({
    pathImage:{type:String,required:true},
    pathFile:{type:String,required:true},
    weigth:{type:Number,required:true},
    fill:{type:Number,required:true},
    sizeX:{type:Number,required:true},
    sizeY:{type:Number,required:true},
    sizeZ:{type:Number,required:true},
    color:{ref:"Color",type: Schema.Types.ObjectId},
    quantity:{type:Number,required:true,default:1}
},{
    versionKey:false
})

export default model("Product",productSchema)