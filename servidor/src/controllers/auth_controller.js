import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Role from '../models/Role.js';
import Cart from '../models/Cart.js';
import { SECRET_KEY } from '../config/config.js';

export const signUp= async(req,res)=>{
    try {
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
        
    } catch (error) {
        res.status(400).json({message:error})
    }

}


export const signUpEmployee= async(req,res)=>{
    try {
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
    } catch (error) {
        res.status(400).json({message:error})
    }

}


export const signIn= async(req,res)=>{
    try {
        console.log(req.body);
        const userFound= await User.findOne({email:req.body.email}).populate("roles");
        if(!userFound) return res.status(404).json("User not found")
        const matchPassword=await User.comparePassword(req.body.password, userFound.password)
        if (!matchPassword) return res.status(401).json({token:null,message:"Incorrect password"})
        const roleNames= userFound.roles.map((rol)=>rol.name)
        const token=jwt.sign({id: userFound._id,name:[userFound.firstName,userFound.lastName],roles:roleNames},SECRET_KEY,{
            expiresIn:'1d'
        })
        console.log(token);
        res.cookie('token',token,{
            sameSite: 'None', 
            secure: false,     
            httpOnly: false,   
            maxAge: 3600,  
        });
        res.status(200).json({ message: 'Signin Successful' });
    } catch (error) {
        res.status(400).json({message:error})
    }
}


export const logout = async (req,res)=>{
    try {
        res.cookie('token','',{
            expires: new Date(0)
        })
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error})
    }
}
