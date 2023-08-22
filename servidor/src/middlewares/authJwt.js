import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";
export const SECRET_KEY='api-ava3d';


export const verifyToken= async (req,res,next)=>{
    try {
        const {token}= req.cookies
        console.log(token);
        if(!token) return res.status(401).json({message:'No token Provided'})

        jwt.verify(token,SECRET_KEY,(err,user)=>{
            if(err) return res.status(400).json({message:'No valid token'})
            req.userId=user.id;
            next();

        })
    } catch (error) {
        return res.status(401).json("Unauthorized")
    }
}

export const isEmployee= async (req,res,next)=>{
    let employeeRoleFound=false;
    const user= await User.findById(req.userId);
    console.log(user)
    const rolesFound= await Role.find({_id:{$in:user.roles }})
    rolesFound.forEach((role)=>{
        if(role.name==="employee"){
            employeeRoleFound=true;
        }
    })
    if(employeeRoleFound){
        next();
    }else{
        return res.status(401).json("Unauthorized, need more privilegies")
    }
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
        return res.status(401).json("Unauthoraized, need more privilegies")
    }
}
