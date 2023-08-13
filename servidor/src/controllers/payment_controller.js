import mercadopago from "mercadopago"
import { NGROKURL } from "../config/config.js";
import { returnProductPrice, returnShipPrice, returnShipDate, returnDiscountPrice } from "../utils/shipUtils.js";
import { createDetail } from "./detail_controller.js";





export const createOrder= async (req,res)=>{
  console.log(req.body);
  console.log(req.body.address);
    mercadopago.configure({
        access_token:'TEST-8133959242082900-071517-0598bf125b902a9a5c64ab882e998c61-1425002340',
    })

    const shipPrice= await returnShipPrice(req.body.city,req.userId)
    const shipDate= await returnShipDate(req.body.city,req.userId)
    const productPrice=await returnProductPrice(req.userId);
    const discountPrice=await returnDiscountPrice(req.body.code,productPrice);
    const result = await mercadopago.preferences.create({
      
        items: [ 
          {
            "title": "Carrito",
            "currency_id": "COP",
            "description": "Comprando el carrito",
            "category_id": "stl",
            "quantity": 1,
            "unit_price": parseInt(productPrice-discountPrice)
          }
        ],
        "metadata": {
          userId:req.userId,
          firstName:req.body.firstName,
          lastName:req.body.lastName,
          numberPhone:req.body.numberPhone,
          address:req.body.address,
          city:req.body.city,
          optionalNotes:req.body.optionalNotes,
          shipDate,
          codeName:req.body.code
        },
        payment_methods:{
          "installments":1
        },
        shipments:{
          cost:parseInt(shipPrice),
          mode:'not_specified'
        },
        binary_mode:true,
        back_urls:{
            success:"http://localhost:4200",
            failure:"http://localhost:4000/api/payment/failure",
            pending:"http://localhost:4000/api/payment/pending",
        },notification_url:NGROKURL+"/api/payment/webhook"
      });
      
      console.log(result.body.init_point);

      res.json(result.body);

}

export const receiveWebhook= async (req,res)=>{
    try {
      let data;
        const payment = req.query;
        console.log(payment);
        if (payment.type === "payment") {
          data = await mercadopago.payment.findById(payment["data.id"]);
          console.log(data);
          console.log('-----------------------------------------------------------');
          console.log(data.body.metadata);
          console.log(data.body.transaction_details.total_paid_amount);
          createDetail(data.body.metadata,data.body.transaction_details.total_paid_amount)
        }
        res.sendStatus(204);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
      }

}

