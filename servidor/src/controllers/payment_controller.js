import { returnProductPrice, returnShipPrice, returnShipDate, returnDiscountPrice } from "../utils/shipUtils.js";
import Cart from "../models/Cart.js";
import axios from 'axios'

const privateKey = 'prv_test_5KiH6Aic7rfqJcdIAt47Y88Fdv2CEQp7';
const prefixLink='https://checkout.wompi.co/l/';


const config = {
    headers: { Authorization: `Bearer ${privateKey}` }
};

export const createPaymentLink=async(req,res)=>{
  let discountPrice=0
  const cartFound=await Cart.findOne({userId:req.userId}).populate('codeUsed');
  console.log(cartFound);
  const productPrice=await returnProductPrice(req.userId);
  if(cartFound.codeUsed) discountPrice=await returnDiscountPrice(cartFound.codeUsed.discount,productPrice);
  const totalPrice=parseInt(cartFound.shipData.shipPrice)+parseInt(productPrice)-parseInt(discountPrice)

  const paymentData={
      "name": "Carrito", // Nombre del link de pago
      "description": "Comprando productos en tu carrito", // Descripción del pago
      "single_use": false, // `false` current caso de que el link de pago pueda recibir múltiples transacciones APROBADAS o `true` si debe dejar de aceptar transacciones después del primer pago APROBADO
      "collect_shipping": false, // Si deseas que el cliente inserte su información de envío current el checkout, o no
      "currency": "COP",  //Únicamente está disponible pesos colombianos (COP) current el momento. En el futuro soportaremos mas monedas
      "amount_in_cents": totalPrice*100, // Si el pago current por un monto especifico, si no lo incluyes el pagador podrá elegir el valor a pagar
      "redirect_url": 'http://localhost:4200/', // URL donde será redirigido el cliente una vez termine el proceso de pago
      "image_url": 'https://eltallerdehector.com/wp-content/uploads/2022/06/88435-logo-batman-3d-png-free.png', // Dirección de la imagen que quieras presentar current el link de pago
      "sku": cartFound._id
}

    axios.post('https://sandbox.wompi.co/v1/payment_links', paymentData,config)
    .then(response => {
        console.log(response.data);
        res.json({'link': prefixLink+response.data.data.id});
    })
    .catch(error => {
        console.error('Error al realizar el pago:', error.message);
    });

}

