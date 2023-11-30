import Cart from "../models/Cart.js";
import Code from "../models/Code.js";
import Detail from "../models/Detail.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import { deleProductFromFirebase } from "../utils/firebaseUtils.js";
import axios from "axios";
import {PRIVATE_KEY} from "../config/config.js"

const config = {
  headers: { Authorization: `Bearer ${PRIVATE_KEY}` },
};

export const createDetail = async (req, res) => {
  try {
    const res = await axios.get(
      `https://sandbox.wompi.co/v1/payment_links/${req.body.data.transaction.payment_link_id}`,
      config
    );
    await axios.patch(
      `https://sandbox.wompi.co/v1/payment_links/${req.body.data.transaction.payment_link_id}`,
      {
        active: false,
      },
      config
    );
    const cartFound = await Cart.findById(res.data.data.sku);
    const userFound= await User.findOne({cart:cartFound._id});
    if (!cartFound) return;
    if (cartFound.codeUsed) {
      const codeFound = await Code.findById(cartFound.codeUsed);
      if (codeFound) {
        await User.findByIdAndUpdate(
          userFound._id,
          { $push: { codesUsed: codeFound._id } }, // Agregar el codeId a la lista codesUsed
          { new: true }
        );
      }
    }

    const newDetail = new Detail({
      cartUsed: cartFound,
      userId: userFound._id,
      totalPrice: req.body.data.transaction.amount_in_cents / 100,
    });

    const savedDetail = await newDetail.save();
    if (savedDetail) {
      const newCart = new Cart({
        products: [],
      });
      await newCart.save();
      userFound.cart=newCart;
      await userFound.save();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllDetailsById= async(req,res)=>{
  try {
    const details=await Detail.find({userId:req.userId}).populate("cartUsed");
    let finishedOrders=[];
    let nonFinishedOrders=[];
    details.forEach(detail => {
      if(detail.status=="finished") finishedOrders.push(detail);
      else{
        nonFinishedOrders.push(detail)
      }
    });

    res.json({
      finishedOrders,
      nonFinishedOrders
    })

  } catch (err) {
    res.status(400).send(err.message);
  }
}

export const getAllDetails = async (req, res) => {
  try {
    const { page, limit, status } = req.query;
    const query = {
      status,
    };

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      populate:{
        path:"cartUsed",
      populate: {
        path: "products",
        populate: {
          path: "color",
        },
      },}
    };
    const result = await Detail.paginate(query, options);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const updateDetailStatus = async (req, res) => {
  try {
    
    if (req.body.status == "finished") {
      const detail = await Detail.findByIdAndUpdate(
        req.body.orderId,
        { status: req.body.status },
        { new: true }
      ).populate({
        path:"cartUsed",
        populate: {
          path: "products",
        }
      });
      console.log(detail)
      for (let product of detail.cartUsed.products) {
        await deleProductFromFirebase(product.path.pathImg, product.path.pathStl);
        await Product.deleteOne({ _id: product._id });
      }
    } 
    
    
    else if (req.body.status == "sending") {
      await Detail.findByIdAndUpdate(req.body.orderId, {
        status: req.body.status,
      });
    }


    return res.json({ message: "order update" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
