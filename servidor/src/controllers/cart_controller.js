import Cart from "../models/Cart.js";
import { returnProductPrice, returnShipDate, returnShipPrice} from "../utils/shipUtils.js";



export const getCartProducts= async(req,res)=>{
    const cartFound= await Cart.findOne({userId:req.userId})
    .populate({
        path: "products",
        populate: {
          path: "color",
        },})
    const productsFound=cartFound.products;
    return res.json(productsFound);
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