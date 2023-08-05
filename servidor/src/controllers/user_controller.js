import Role from "../models/Role.js";
import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
      // const userFound=await User.findById(req.params.id,{password:false})//se trae al usuario y se excluye su contraseña
      // if (!userFound) {
      //   return res.status(404).send('User not found');
      // }
      // res.json(userFound);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error');
    }
  };

  export const getEmployees = async(req,res) =>{
    try {
      const roleEmployee=await Role.findOne({name:'employee'});
      const employees=await User.find({roles:roleEmployee._id});
      res.json(employees);

      
    } catch (error) {
      res.status(200).send("error get all employees")
    }
  }