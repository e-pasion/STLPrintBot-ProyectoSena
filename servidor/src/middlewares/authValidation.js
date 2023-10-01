import User from "../models/User.js";

export const duplicateEmail=async(req,res,next)=>{
    const emailFound=await User.findOne({email:req.body.email})
    if(emailFound) return res.status(400).json({message:"Ya existe un usuario con este correo"})
    next();
}