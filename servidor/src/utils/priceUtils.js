import Cart from "../models/Cart.js";


export const getTotalPrice= async (userId)=>{
  const cartFound= await Cart.findOne({userId:userId}).populate("products");
  const productsFound=cartFound.products;
  const productsPrice= productsFound.map(products=>((products.weigth*80000)/1000)*products.quantity)
  const totalPrice= productsPrice.reduce((acum,price)=>acum+price,0);
  return adjustPrice(totalPrice);
}

const adjustPrice= (price)=>{
  return (price-price%50).toFixed(0);
}