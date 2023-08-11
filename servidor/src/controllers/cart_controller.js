import Cart from "../models/Cart.js";
import { returnProductPrice, returnShipDays, returnShipPrice} from "../utils/priceUtils.js";



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

export const getDaysShip=async(req,res)=>{
  const printSpeedInGrPerS=0.0022;
  const cartFound= await Cart.findOne({userId:req.userId});
  const timeInS= (cartFound.totalWeigth/printSpeedInGrPerS);//se obtiene el tiempo de impresion en segundos
  const timeInDays=timeInS/86400; //se pasa el tiempo en segundos a tiempo en dias
  const printDays=Math.ceil(timeInDays)+1; //redondeamos el tiempo en dias y le aumentamos un dia de preparacion
  const shipDays=await returnShipDays(req.body.city);
  return res.json({days:printDays+shipDays})
}



export const getShipPrice=async(req,res)=>{
  const shipPrice= await returnShipPrice(req.body.city,req.userId)
  const shipDays= await returnShipDays(req.body.city,req.userId)
  return res.json({shipPrice,shipDays});
}