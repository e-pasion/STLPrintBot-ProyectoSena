import Cart from "../models/Cart.js";
import { returnProductPrice, returnShipDate, returnShipPrice} from "../utils/shipUtils.js";
import { calculateStlPrice } from "../utils/stlUtils.js";


export const getCart= async(req,res)=>{
  let productsFound=[];
  const cartFound= await Cart.findOne({userId:req.userId})
    .populate({
        path: "products",
        populate: {
          path: "color",
        }}).populate("codeUsed");
  console.log(req.userId);
  console.log("xd: "+ cartFound);  
  if(cartFound.products){
    productsFound=cartFound.products;
    for (let product of productsFound) {
    let price = await calculateStlPrice(product.weigth);
    product.price=price;
    }
  }
  cartFound.products=productsFound;
  console.log(cartFound);
  return res.json(cartFound);
}

export const getProductPrice= async (req,res)=>{
  const totalPrice=await returnProductPrice(req.userId);
  return res.json(totalPrice);
}

export const getShipPrice=async(req,res)=>{
  const shipPrice= await returnShipPrice(req.body.city,req.userId)
  const shipDate= await returnShipDate(req.body.city,req.userId)
  return res.json({shipPrice,shipDate});
}

export const saveShipData= async(req,res)=>{
  const shipData = req.body;
  const cartUpdated = await Cart.findOneAndUpdate({ userId: req.userId }, {shipData}, { new: true });
  console.log(cartUpdated);
  return res.json({message:'Ship Data Updated'})
}