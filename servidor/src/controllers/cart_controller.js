import Cart from "../models/Cart.js";

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

export const getTotalPrice= async (req,res)=>{
  const cartFound= await Cart.findOne({userId:req.userId}).populate("products");
  const productsFound=cartFound.products;
  const productsPrice= productsFound.map(products=>((products.weigth*80000)/1000)*products.quantity)
  const totalPrice= productsPrice.reduce((acum,price)=>acum+price,0);
  return res.json(adjustPrice(totalPrice));
}

const adjustPrice= (price)=>{
  return (price-price%50).toFixed(0);
}