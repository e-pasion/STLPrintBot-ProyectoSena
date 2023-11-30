import Cart from "../models/Cart.js";
import User from "../models/User.js";
import {
  returnProductPrice,
  returnShipDate,
  returnShipPrice,
} from "../utils/shipUtils.js";
import { calculateStlPrice } from "../utils/stlUtils.js";


export const getCartLength=async (req,res) =>{
  const userFound= await User.findById(req.userId);
  const cartFound = await Cart.findById(userFound.cart).populate("products");
  let length=0;
  cartFound?.products.forEach((product)=>{
    length+=product.quantity;
  })
    console.log(cartFound)
    return res.json({ length});
}

export const getCart = async (req, res) => {
  let productsFound = [];
  const userFound= await User.findById(req.userId);
  const cartFound = await Cart.findById(userFound.cart)
    .populate({
      path: "products",
      populate: {
        path: "color",
      },
    })
    .populate("codeUsed");
  if (cartFound.products) {
    productsFound = cartFound.products;
    for (let product of productsFound) {
      let price = await calculateStlPrice(product.weigth);
      product.price = price;
    }
  }
  cartFound.products = productsFound;
  console.log(cartFound);
  return res.json(cartFound);
};

export const getProductPrice = async (req, res) => {
  const totalPrice = await returnProductPrice(req.userId);
  return res.json(totalPrice);
};

export const getShipPrice = async (req, res) => {
  const shipPrice = await returnShipPrice(req.body.city, req.userId);
  const shipDate = await returnShipDate(req.body.city, req.userId);
  return res.json({ shipPrice, shipDate });
};

export const saveShipData = async (req, res) => {
  const shipData = req.body;
  const userFound= await User.findById(req.userId);
  const cartUpdated = await Cart.findByIdAndUpdate(userFound.cart,{shipData},{new:true});
  console.log(cartUpdated);
  return res.json({ message: "Ship Data Updated" });
};
