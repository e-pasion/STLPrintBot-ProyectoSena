import Cart from "../models/Cart.js";
import Setting from "../models/Setting.js";
import User from "../models/User.js";
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
  "Caldas"
]

export const returnProductPrice= async (userId)=>{
  let totalPrice=0;
  const userFound= await User.findById(userId);
  const cartFound= await Cart.findById(userFound.cart).populate("products");
  let productsFound=cartFound.products;
  for (let product of productsFound) {
    totalPrice+= parseFloat(await calculateStlPrice(product.weigth))*product.quantity
  }
  return totalPrice;
}

export const returnTotalWeigth= async (userId)=>{
  let weigth=0;
  const userFound= await User.findById(userId);
  const cartFound= await Cart.findById(userFound.cart).populate("products");
  let productsFound=cartFound.products;
  for (let product of productsFound) {
    weigth+= product.weigth;
  }
  return weigth;
}

export const returnDiscountPrice = async(codeDiscount,price)=>{
  const discountPrice= Math.round(price*(codeDiscount/100)/50)*50;
  console.log(discountPrice);
  return discountPrice;
}


export const returnShipDate=async(city,userId)=>{
  console.log(city);
  const printSpeedInGrPerS=0.0022;
  const timeInS= (await returnTotalWeigth(userId)/printSpeedInGrPerS);//se obtiene el tiempo de impresion en segundos
  const timeInDays=timeInS/86400; //se pasa el tiempo en segundos a tiempo en dias
  const printDays=Math.ceil(timeInDays)+1; //redondeamos el tiempo en dias y le aumentamos un dia de preparacion
  const shipDays=(metropolitanCities.includes(city))?1:3;
  return calculateEstimatedDate(printDays+shipDays);
}


export const returnShipPrice= async (city,userId)=>{
  const setting= await Setting.find();
  console.log(city);
  if(returnProductPrice(userId)>setting[0].settings[0].value){
    return 0;
  }
  else if (metropolitanCities.includes(city)){
    return setting[0].settings[1].value;
  }
  else{
    return setting[0].settings[2].value;;
  }

}

function calculateEstimatedDate(shipDays) {
  console.log(shipDays);
  const currentDate = new Date();
  const estimatedDate = new Date(currentDate);
  estimatedDate.setDate(currentDate.getDate() + shipDays);
  return estimatedDate;
}

export const adjustPrice= (price)=>{
  return (price-price%50).toFixed(0);
}