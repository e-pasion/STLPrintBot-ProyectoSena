import nodeStl from 'node-stl'
import fs from 'fs'
import Product from '../models/Product.js';
import Color from '../models/Color.js';
import Cart from '../models/Cart.js';
import { calculatePrice, calculateWeigth } from '../utils/stlUtils.js';
import { adjustPrice } from '../utils/priceUtils.js';


export const cotization=async(req,res)=>{
    let stl = new nodeStl(req.file.path, {density: 1.24});
    let fill=req.body.fill/100;
    let weigth= calculateWeigth(1.24,fill,stl.volume)
    let price= adjustPrice(calculatePrice(weigth,80000))
    console.log("peso formula 1: "+stl.weight*fill);//Esta es la mala
    console.log("Peso formula 2: "+weigth);//esta es la buena
   

    // fs.unlink(req.file.path, (err) => {//borra el archivo stl despues de usarlo
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     })
        return res.json({price});
}

export const createProduct= async(req,res)=>{
  const filePaths = req.files.map(file => file.path);
  const stlFile = filePaths[1];
  const imgFile = filePaths[0];
  let stl = new nodeStl(stlFile, {density: 1.24});
  let { fill, colorCode }=req.body;
  let size= stl.boundingBox;

  const color= await Color.findOne({code:colorCode});
  if(!color) return res.status(404).json({message:"color not found"})
  const newProduct= new Product({
    pathImage:imgFile,
    pathFile:stlFile,
    weigth:calculateWeigth(1.24,fill/100,stl.volume),
    fill,
    sizeX:size[0]/10,
    sizeY:size[1]/10,
    sizeZ:size[2]/10,
    color:color._id,
    cantidad:1
  })
  const savedProduct= await newProduct.save();
 
  await Cart.findOneAndUpdate({ userId: req.userId }, 
    { $push: { products: newProduct._id } },
    { new: true });

    await Cart.findOneAndUpdate(
      { userId: req.userId },
      { $inc: { totalWeigth: newProduct.weigth } },
      { new: true }
    );

  return res.json(savedProduct);
}


export const getProduct=async(req,res)=>{
  const productFound= await Product.findOne({_id:req.params.id});
  return res.json(productFound)
}

export const updateQuantityProduct = async(req,res)=>{
  const quantity= req.body.quantity;
  await Product.findOneAndUpdate({ _id: req.params.id },{ $set: { quantity } }  );  
  return res.json(quantity);
}

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: 'Producto no encontrado' });
    }

    await Cart.findOneAndUpdate(
      { userId: req.userId },
      { $inc: { totalWeigth: -product.weigth } },
      { new: true }
    );



    await Cart.findOneAndUpdate(
      { userId: req.userId },
      { $pull: { products:productId} }
    );

    await Product.deleteOne({_id:productId})
    res.send({ message: 'Producto Borrado' });

    
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};