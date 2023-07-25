import mercadopago from "mercadopago"
import { NGROKURL } from "../config/config.js";
import { returnProductPrice } from "../utils/priceUtils.js";





export const createOrder= async (req,res)=>{
  console.log(req.body);
  console.log(req.body.address);
    mercadopago.configure({
        access_token:'TEST-8133959242082900-071517-0598bf125b902a9a5c64ab882e998c61-1425002340',
    })

    const shipPrice=req.body.shipPrice;
    const productPrice=await returnProductPrice(req.userId);
    const totalPrice=parseInt(productPrice)+parseInt(shipPrice);
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
        "metadata": {
          userId:req.body.userId,
          firstName:req.body.firstName,
          lastName:req.body.lastName,
          numberPhone:req.body.numberPhone,
          address:req.body.address,
          city:req.body.city,
          optionalNotes:req.body.optionalNotes,
        },
        payment_methods:{
          "installments":1
        },
        shipments:{
          cost:shipPrice,
          mode:'not_specified'
        },
        binary_mode:true,
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
          console.log('-----------------------------------------------------------');
          console.log(data.body.metadata);
        }
        res.sendStatus(204);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
      }

}

