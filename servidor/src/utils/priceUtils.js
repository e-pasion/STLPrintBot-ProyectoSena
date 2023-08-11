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

// export const returnShipDays= async (city)=>{
//   console.log(city);
//   const days= (metropolitanCities.includes(city))?1:3;
//   return days;
// }

export const returnShipDays=async(city,userId)=>{
  console.log(city);
  const printSpeedInGrPerS=0.0022;
  const cartFound= await Cart.findOne({userId:userId});
  const timeInS= (cartFound.totalWeigth/printSpeedInGrPerS);//se obtiene el tiempo de impresion en segundos
  const timeInDays=timeInS/86400; //se pasa el tiempo en segundos a tiempo en dias
  const printDays=Math.ceil(timeInDays)+1; //redondeamos el tiempo en dias y le aumentamos un dia de preparacion
  const shipDays=(metropolitanCities.includes(city))?1:3;
  return printDays+shipDays;
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