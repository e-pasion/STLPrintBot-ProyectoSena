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
    if (!cartFound) return;
    if (cartFound.codeUsed) {
      const codeFound = await Code.findById(cartFound.codeUsed);
      if (codeFound) {
        await User.findByIdAndUpdate(
          cartFound.userId,
          { $push: { codesUsed: codeFound._id } }, // Agregar el codeId a la lista codesUsed
          { new: true }
        );
      }
    }

    const newDetail = new Detail({
      userId: cartFound.userId,
      products: cartFound.products,
      shipData: cartFound.shipData,
      totalPrice: req.body.data.transaction.amount_in_cents / 100,
    });

    const savedDetail = await newDetail.save();
    if (savedDetail) {
      await Cart.findByIdAndDelete(cartFound._id);
      const newCart = new Cart({
        userId: cartFound.userId,
        products: [],
      });
      await newCart.save();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllDetails = async (req, res) => {
  try {
    const { page, limit, status } = req.query;
    const query = {
      status,
    };

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      populate: {
        path: "products",
        populate: {
          path: "color",
        },
      },
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
      ).populate("products");
      for (let product of detail.products) {
        await deleProductFromFirebase(product.path.pathImg, product.path.pathStl);
        await Product.deleteOne({ _id: product._id });
      }
      await Detail.findByIdAndUpdate(req.body.orderId, {
        $set: { products: [] },
      });
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
