import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";

export const verifyToken= async (req,res,next)=>{
    try {
        const token=req.headers["x-access-token"]
        if(!token) return res.status(403).json("No token provided")
        const decoded=jwt.verify(token,'api-ava3d')
        req.userId=decoded.id;
        const userFound=User.findById(req.userId,{password:false})//se trae al usuario y se excluye su contraseña
        if(!userFound) return res.status(404).json({message:"No user found"})
        console.log(decoded);
        next();
    } catch (error) {
        return res.status(401).json("Unauthoraized")
    }
}

export const isEmployee= async (req,res,next)=>{

    const user= await User.findById(req.userId);
    console.log(user)
    const rolesFound= await Role.find({_id:{$in:user.roles }})
    rolesFound.forEach((role)=>{
        if(role.name==="employee"){
            next();
            return
        }else{
            return res.status(401).json("Unauthoraized, need more privilegies")
        }
    })  
}

export const isAdmin= async (req,res,next)=>{
    let validateAdmin=false;
    const user= await User.findById(req.userId);
    const rolesFound= await Role.find({_id:{$in:user.roles }})
    console.log(rolesFound)
    rolesFound.forEach((role)=>{
        if(role.name==="admin"){
            validateAdmin=true;
        }
    })
    if(validateAdmin){
        next();
        return
    }else{
        console.log("aquino")
            return res.status(401).json("Unauthoraized, need more privilegies")
    }
}
