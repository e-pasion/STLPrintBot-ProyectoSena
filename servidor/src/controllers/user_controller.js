import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
      const userFound=await User.findById(req.params.id,{password:false})//se trae al usuario y se excluye su contraseña
      if (!userFound) {
        return res.status(404).send('Color not found');
      }
      res.json(userFound);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error');
    }
  };