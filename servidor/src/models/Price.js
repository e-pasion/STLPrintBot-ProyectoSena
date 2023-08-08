import { model,Schema } from "mongoose";

const priceSchema= new Schema({
    name:{type:String,require:true},
    value:{type:Number,require:true}

    // priceFreeDelivery:{type:Number,require:true},
    // priceLocalDelivery:{type:Number,require:true},
    // priceRestDelivery:{type:Number,require:true},
    // priceKgFilament:{type:Number,require:true},
    // failPercentaje:{type:Number,require:true},
    // gainPercentaje:{type:Number,require:true}
},{
    versionKey:false
})

export default model("Price",priceSchema)