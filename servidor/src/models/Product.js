import { model,Schema } from "mongoose";

const productSchema= new Schema({
    path:{    
        pathImg:{type:String,required:true},
        pathStl:{type:String,required:true},
        downloadImg:{type:String,required:true},
        downloadStl:{type:String,required:true}
    },size:{
        x:{type:Number,required:true},
        y:{type:Number,required:true},
        z:{type:Number,required:true}
    },
    weigth:{type:Number,required:true},
    fill:{type:Number,required:true},
    price:{type:Number},
   
    color:{ref:"Color",type: Schema.Types.ObjectId},
    quantity:{type:Number,required:true,default:1}
},{
    versionKey:false
})

export default model("Product",productSchema)
