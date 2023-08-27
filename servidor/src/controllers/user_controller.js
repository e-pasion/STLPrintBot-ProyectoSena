import Role from "../models/Role.js";
import User from "../models/User.js";
import mongoose from 'mongoose';


export const getUser = async (req, res) => {
    try {
      const userFound=await User.findById(req.params.id,{password:false})//se trae al usuario y se excluye su contraseña
      if (!userFound) {
        return res.status(404).send('User not found');
      }
      res.json(userFound);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error');
    }
  };

  export const getEmployees = async(req,res) =>{
    try {
      const {page, limit, search, status} = req.query;
      const roleEmployee=await Role.findOne({name:'employee'});
      const roleAdmin=await Role.findOne({name:'admin'});

      const query = {
        $and: [
          { roles: new mongoose.Types.ObjectId(roleEmployee._id) },
          { roles: { $ne: new mongoose.Types.ObjectId(roleAdmin._id) } }
        ]
      };

      if (status === 'true' || status === 'false') {
        query.status = status === 'true';
      }

      if (search){
        query.$or = [
          { firstName: { $regex: search, $options: 'i' } }, 
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ]
      }
      const options = {
        page:parseInt(page,10) || 1,
        limit: parseInt(limit,10) || 10,
      }
      const result = await User.paginate(query,options);
      
      res.json(result);
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  export const toggleEmployeeStatus= async(req,res)=>{
    try {
      const employeeFound=await User.findById(req.params.id);
      if (!employeeFound) return res.status(404).json({message: 'User not found'})  
      employeeFound.status = !employeeFound.status;
      await employeeFound.save();
      res.json({message:"status updated"})
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  export const editEmployee= async(req,res)=>{
    try {
      const employee = await User.findByIdAndUpdate(req.params.id, req.body, {
        new : true
    });
      if (!employee) return res.status(404).json({message: 'User not found'})  
      res.status(201).json("Employee edited successfully ")
      
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  export const removeEmployee= async(req,res)=>{
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user)return res.status(404).json({ message: 'User not found' });
      res.status(204).json({message:'User deleted succesfully'});
      
    } catch (error) {
      res.status(400).send(error.message)
    }
  }