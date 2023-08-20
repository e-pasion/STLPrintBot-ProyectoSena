import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Role from '../models/Role.js';
import Cart from '../models/Cart.js';
import { SECRET_KEY } from '../config/config.js';

export const signUp= async(req,res)=>{
    const { firstName,lastName,email,password}=req.body;
    const newUser= new User({
        firstName,
        lastName,
        email,
        password:await User.encryptPassword(password)
    })
    const role= await Role.findOne({name:"client"});//busca el id del rol que se le pase para asignarlo al
    newUser.roles=[role._id];
    const savedUser=await newUser.save()
    
    const newCart= new Cart({
        userId:savedUser._id,
        products:[]
    })

    await newCart.save();
    res.status(200).json({user:"Is created"})
}


export const signUpEmployee= async(req,res)=>{
    const { firstName,lastName,email,password}=req.body;

    const newUser= new User({
        firstName,
        lastName,
        email,
        password:await User.encryptPassword(password),
        status:true
    })
     const role= await Role.findOne({name:"employee"});//busca el id del rol que se le pase para asignarlo al
     newUser.roles=[role._id];
    await newUser.save()
    res.status(200).json({employee:'is created'})
}


export const signIn= async(req,res)=>{
    console.log(req.body)
    const userFound= await User.findOne({email:req.body.email}).populate("roles");
    if(!userFound) return res.status(404).json("El email no fue encontrado")
    const matchPassword=await User.comparePassword(req.body.password, userFound.password)
    if (!matchPassword) return res.status(401).json({token:null,message:"La contraseña es incorrecta"})
    const roleNames= userFound.roles.map((rol)=>rol.name)
    const token=jwt.sign({id: userFound._id,name:[userFound.firstName,userFound.lastName],roles:roleNames},SECRET_KEY,{
        expiresIn:86400//24 horas en segundos
    })
    res.json({token})
}

