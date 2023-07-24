import Cart from "../models/Cart.js";
import { calculatePrice } from "./stlUtils.js";


const metropolitanCities=[
  "Barbosa",
  "Girardota",
  "Copacabana",
  "Bello",
  "Medellín",
  "Envigado",
  "Itagüí",
  "La Estrella",
  "Sabaneta",
  "caldas"
]

export const returnProductPrice= async (userId)=>{
  const cartFound= await Cart.findOne({userId:userId}).populate("products");
  const totalWeigth= cartFound.totalWeigth;
  const totalPrice= calculatePrice(totalWeigth,80000)
  return adjustPrice(totalPrice);
}

export const returnShipPrice= async (city,userId)=>{
  console.log(city);
  if(returnProductPrice(userId)>50000){
    return 0;
  }
  else if (metropolitanCities.includes(city)){
    return 8000
  }
  else{
    return 12000;
  }

}

export const adjustPrice= (price)=>{
  return (price-price%50).toFixed(0);
}