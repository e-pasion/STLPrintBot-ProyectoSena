import Setting from "../models/Setting.js"



export const getPriceData=async(req,res)=>{
    try {
        const priceData= await Setting.find();
        res.send(priceData[0])
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const updatePrice= async(req,res)=>{
    try {
        console.log(req.body);
        const priceFound= await Setting.findById(req.params.id);
        priceFound.settings=req.body;
        console.log(priceFound);
        const priceSaved = await Setting.findOneAndUpdate({ _id: req.params.id }, priceFound, { new: true });


      res.status(201).json("Setting edited successfully ")
    } catch (error) {
        console.log(error);
      res.status(400).send(error)
    }
  }
