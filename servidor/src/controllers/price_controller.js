import Price from "../models/Price.js"



export const getPriceData=async(req,res)=>{
    try {
        const priceData= await Price.find();
        res.send(priceData)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
