import Cart from "../models/Cart.js";
import Code from "../models/Code.js"
import User from "../models/User.js"
import { calculateStlPrice } from "./stlUtils.js";


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

// export const returnProductPrice= async (userId)=>{
//   const cartFound= await Cart.findOne({userId:userId}).populate("products");
//   const totalWeigth= cartFound.totalWeigth;
//   return calculateStlPrice(totalWeigth);
// }
export const returnProductPrice= async (userId)=>{
  let totalPrice=0;
  const cartFound= await Cart.findOne({userId:userId}).populate("products");
  let productsFound=cartFound.products;
  for (let product of productsFound) {
    totalPrice+= parseFloat(await calculateStlPrice(product.weigth))*product.quantity
  }
  return totalPrice;
}
export const returnDiscountPrice = async(codeName,price)=>{
  const code = await Code.findOne({ code: codeName });
  if(!code) return 0;
  const discountPrice= Math.round(price*(code.discount/100)/50)*50;
  console.log(discountPrice);
  return discountPrice;
}


export const returnShipDate=async(city,userId)=>{
  console.log(city);
  const printSpeedInGrPerS=0.0022;
  const cartFound= await Cart.findOne({userId:userId});
  const timeInS= (cartFound.totalWeigth/printSpeedInGrPerS);//se obtiene el tiempo de impresion en segundos
  const timeInDays=timeInS/86400; //se pasa el tiempo en segundos a tiempo en dias
  const printDays=Math.ceil(timeInDays)+1; //redondeamos el tiempo en dias y le aumentamos un dia de preparacion
  const shipDays=(metropolitanCities.includes(city))?1:3;
  return calculateEstimatedDate(printDays+shipDays);
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

function calculateEstimatedDate(shipDays) {
  const currentDate = new Date();
  const estimatedDate = new Date(currentDate);
  estimatedDate.setDate(currentDate.getDate() + shipDays);
  return estimatedDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

export const adjustPrice= (price)=>{
  return (price-price%50).toFixed(0);
}