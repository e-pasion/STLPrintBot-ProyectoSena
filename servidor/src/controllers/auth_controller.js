import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Role from '../models/Role.js';
import Cart from '../models/Cart.js';

export const signUp= async(req,res)=>{
    const { fullName,email,password}=req.body;
    console.log(fullName)
    console.log(email)
    console.log(password)

    const newUser= new User({
        fullName,
        email,
        password:await User.encryptPassword(password),
        pathImage:"https://www.dreamstime.com/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-image179376714"
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
    const { fullName,email,password}=req.body;

    const newUser= new User({
        fullName,
        email,
        password:await User.encryptPassword(password)
    })
     const role= await Role.findOne({name:"employee"});//busca el id del rol que se le pase para asignarlo al
     newUser.roles=[role._id];
    const savedUser=await newUser.save()
    res.status(200).json({token})
}


export const signIn= async(req,res)=>{
    console.log(req.body)
    const userFound= await User.findOne({email:req.body.email}).populate("roles");
    if(!userFound) return res.status(404).json("El email no fue encontrado")
    const matchPassword=await User.comparePassword(req.body.password, userFound.password)
    if (!matchPassword) return res.status(401).json({token:null,message:"La contraseña es incorrecta"})
    const roleNames= userFound.roles.map((rol)=>rol.name)
    //el segundo parametro es la llave secreta, lo recomendable es exportarla desde una configuracion
    const token=jwt.sign({id: userFound._id,roles:roleNames},'api-ava3d',{
        expiresIn:86400//24 horas en segundos
    })

    res.json({token})
}

