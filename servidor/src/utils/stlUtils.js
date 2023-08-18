import Setting from "../models/Setting.js";
import { adjustPrice } from "./shipUtils.js";


export const calculateWeigth=(fill,  volume)=>{
     const outerwall=Math.pow(volume,2/3); //volumen externo de la figura
     const innerwall=fill*(volume-outerwall);//volumen interno de la figura
     return (outerwall+innerwall)*1.24;
}

export const calculateStlPrice= async (weigthPerGr)=>{
     const setting= await Setting.find();
     const pricePerKg= setting[0].settings[3].value;//obtener la configuracion con los precios
     const failPercenaje =setting[0].settings[4].value;
     const gainsPercenaje =setting[0].settings[5].value;
     const productPrice=(pricePerKg*weigthPerGr/1000) * (1+((failPercenaje+gainsPercenaje)/100)); //calcula el precio y le añade porcentaje de perdida y ganancia
     return adjustPrice(productPrice);
}



