import nodeStl from 'node-stl'
import Product from '../models/Product.js';
import Color from '../models/Color.js';
import Cart from '../models/Cart.js';
import { calculateStlPrice, calculateWeigth } from '../utils/stlUtils.js';
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject,listAll } from "firebase/storage";
import path from 'path';

export const cotization=async(req,res)=>{
    let {volume,fill}=req.body;
    let weigth= calculateWeigth(fill,volume);
    let price= await calculateStlPrice(weigth);
    return res.json({price});
}

export const createProduct= async(req,res)=>{
    const path= await storageProduct(req.files);
    const stl = new nodeStl(req.files[1].buffer, {density: 1.24});
    const size = stl.boundingBox;
    let { fill, colorCode }=req.body;

    const color= await Color.findOne({code:colorCode});
    if(!color) return res.status(404).json({message:"color not found"})

 
    const newProduct= new Product({
      path,
      size:{
        x:size[0]/10,
        y:size[1]/10,
        z:size[2]/10,
      },
      weigth:calculateWeigth(fill,stl.volume),
      fill:fill*100,
      color:color._id,
    })

    const savedProduct= await newProduct.save();
    await Cart.findOneAndUpdate({ userId: req.userId }, { $push: { products: newProduct._id } },{ new: true });
  
    return res.json(savedProduct);
}



const storageProduct= async(files)=>{
  const storage = getStorage();
  const imgExtension = path.extname(files[0].originalname);
  const stlExtension = path.extname(files[1].originalname);
  const storageImgRef = ref(storage, `img/${Date.now() + imgExtension}`);
  const storageStlRef = ref(storage, `stl/${Date.now() + stlExtension}`);
  const snapshotImg = await uploadBytesResumable(storageImgRef, files[0].buffer);
  const snapshotStl = await uploadBytesResumable(storageStlRef, files[1].buffer);
  return {
    pathImg:storageImgRef.fullPath,
    pathStl:storageStlRef.fullPath,
    downloadImg:await getDownloadURL(snapshotImg.ref),
    downloadStl:await getDownloadURL(snapshotStl.ref)
  }
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
    if (!product) return res.status(404).send({ message: 'Product not found' });
    await deleteProductStorage(product.path.pathImg,product.path.pathStl);
    await Cart.findOneAndUpdate({ userId: req.userId },{ $pull: { products:productId} });
    await Product.deleteOne({_id:productId})
    res.sendStatus(204);

  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteProductStorage = async(pathImg,pathStl)=>{
  try {
    const storage = getStorage();
    const imgRef = ref(storage, pathImg);
    const stlRef = ref(storage, pathStl);
    await deleteObject(imgRef);
    await deleteObject(stlRef);
  } catch (error) {
    console.log(error);
  }
}