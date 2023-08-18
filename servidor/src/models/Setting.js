import { model,Schema } from "mongoose";

const settingSchema= new Schema({
    settings: [{
            name: { type: String, required: true },
            value: { type: Number, required: true }
        }]
},{
    versionKey:false
})

export default model("Setting",settingSchema)