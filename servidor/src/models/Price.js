import { model,Schema } from "mongoose";

const priceSchema= new Schema({
    priceKgFilament:{type:Number,require:true},
    priceKWh:{type:Number,require:true},
    failPercentaje:{type:Number,require:true},
    gainPercentaje:{type:Number,require:true}
},{
    versionKey:false
})

export default model("Price",priceSchema)