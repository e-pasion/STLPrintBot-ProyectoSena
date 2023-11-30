import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
      const userFound=await User.findById(req.userId,{password:false})
      if (!userFound) {
        return res.status(404).send('User not found');
      }
      res.json(userFound);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error');
    }
  };

  export const editContactInfo = async(req,res)=>{
    try {
      const userFound=await User.findById(req.userId,{password:false})
      if (!userFound) {
        return res.status(404).send('User not found');
      }
      userFound.department=req.body.department;
      userFound.address=req.body.address;
      userFound.city=req.body.city;
      userFound.numberPhone=req.body.numberPhone;
      await userFound.save();
      res.status(200).json({ employee: "updated" });
    } catch (error) {
      res.status(500).send('Error');
      console.log(error);
    }
  }

  export const updatePasswordAndEmail= async(req,res)=>{
    try {
      const userFound=await User.findById(req.userId)
      if (!userFound) {
        return res.status(404).send('Usuario no encontrado');
      }
      const existingUser = await User.findOne({ email:req.body.email });
    if (existingUser && existingUser.email!=userFound.email) {
      return res.status(400).json({ message: 'Ese correo electrónico ya está registrado' });
    }
      userFound.email=req.body.email;
      userFound.password= await User.encryptPassword(req.body.password);
      await userFound.save();
      res.status(200).json({ employee: "updated" });
      
    } catch (error) {
      res.status(500).send('Error');
      console.log(error);
    }
  }

 
  