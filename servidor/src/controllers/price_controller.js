import Price from "../models/Price.js"



export const getPriceData=async(req,res)=>{
    try {
        const priceData= await Price.find();
        res.send(priceData[0])
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const updatePrice= async(req,res)=>{
    try {
        console.log(req.body);
        const priceFound= await Price.findById(req.params.id);
        priceFound.settings=req.body;
        console.log(priceFound);
        const priceSaved = await Price.findOneAndUpdate({ _id: req.params.id }, priceFound, { new: true });


      res.status(201).json("Price edited successfully ")
    } catch (error) {
        console.log(error);
      res.status(400).send(error)
    }
  }
