import nodeStl from "node-stl";
import Product from "../models/Product.js";
import Color from "../models/Color.js";
import Cart from "../models/Cart.js";
import { calculateStlPrice, calculateWeigth } from "../utils/stlUtils.js";
import {
  saveProductInFirebase,
  deleProductFromFirebase,
} from "../utils/firebaseUtils.js";

export const cotization = async (req, res) => {
  let { volume, fill } = req.body;
  let weigth = calculateWeigth(fill, volume);
  let price = await calculateStlPrice(weigth);
  return res.json({ price });
};

export const createProduct = async (req, res) => {
  const path = await saveProductInFirebase(req.files);
  const stl = new nodeStl(req.files[1].buffer, { density: 1.24 });
  const size = stl.boundingBox;
  let { fill, colorCode } = req.body;

  const color = await Color.findOne({ code: colorCode });
  if (!color) return res.status(404).json({ message: "color not found" });

  const newProduct = new Product({
    path,
    size: {
      x: size[0] / 10,
      y: size[1] / 10,
      z: size[2] / 10,
    },
    weigth: calculateWeigth(fill, stl.volume),
    fill: fill * 100,
    color: color._id,
  });

  await newProduct.save();
  await Cart.findOneAndUpdate(
    { userId: req.userId },
    { $push: { products: newProduct._id } },
    { new: true }
  );
  return res.json({ message: "Producto guardado" });
};

export const getProduct = async (req, res) => {
  const productFound = await Product.findOne({ _id: req.params.id });
  return res.json(productFound);
};

export const updateQuantityProduct = async (req, res) => {
  const quantity = req.body.quantity;
  await Product.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { quantity } }
  );
  return res.json(quantity);
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send({ message: "Product not found" });
    await deleProductFromFirebase(product.path.pathImg, product.path.pathStl);
    await Cart.findOneAndUpdate(
      { userId: req.userId },
      { $pull: { products: productId } }
    );
    await Product.deleteOne({ _id: productId });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error);
  }
};
