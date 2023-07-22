import mercadopago from "mercadopago"
import { NGROKURL } from "../config/config.js";
import { getTotalPrice } from "../utils/priceUtils.js";

export const createOrder= async (req,res)=>{
    mercadopago.configure({
        access_token:'TEST-8133959242082900-071517-0598bf125b902a9a5c64ab882e998c61-1425002340',
    })

    
    const totalPrice=parseInt(await getTotalPrice(req.userId));
    const result = await mercadopago.preferences.create({
        items: [ 
          {
            "title": "Carrito",
            "currency_id": "COP",
            "description": "Comprando el carrito",
            "category_id": "stl",
            "quantity": 1,
            "unit_price": totalPrice
          }
        ],
        back_urls:{
            success:"http://localhost:4000/api/payment/success",
            failure:"http://localhost:4000/api/payment/failure",
            pending:"http://localhost:4000/api/payment/pending",
        },notification_url:NGROKURL+"/api/payment/webhook"
      });
      
      console.log(result.body.init_point);

      res.json(result.body);

}

export const receiveWebhook= async (req,res)=>{
    try {
        const payment = req.query;
        console.log(payment);
        if (payment.type === "payment") {
          const data = await mercadopago.payment.findById(payment["data.id"]);
          console.log(data);
        }
        res.sendStatus(204);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
      }

}