import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Role from "../models/Role.js";
import Cart from "../models/Cart.js";
import { SECRET_KEY } from "../config/config.js";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: await User.encryptPassword(password),
    });
    const role = await Role.findOne({ name: "client" }); //busca el id del rol que se le pase para asignarlo al
    newUser.roles = [role._id];
    const savedUser = await newUser.save();

    const newCart = new Cart({
      userId: savedUser._id,
      products: [],
    });

    await newCart.save();
    res.status(200).json({ user: "Is created" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};


export const signIn = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );
    if (!userFound)
      return res.status(404).json({ message: "Correo incorrecto" });
    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );
    if (!matchPassword) {
      return res
        .status(401)
        .json({ token: null, message: "Contraseña incorrecta" });
    }
    const roleNames = userFound.roles.map((rol) => rol.name);
    const token = jwt.sign(
      {
        id: userFound._id,
        name: [userFound.firstName, userFound.lastName],
        roles: roleNames,
      },
      SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    console.log(token);
    res.cookie("token", token, {
      maxAge: 360000000000,
    });
    res.status(200).json({ message: "Signin Successful" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const validatePassword = async (req, res) => {
  try {
    const userFound = await User.findById(req.userId);
    console.log(userFound);
    console.log(req.body);
    if (!userFound) return res.status(404).json({ message: "User not found" });
    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword) {
      return res
        .status(401)
        .json({ token: null, message: "Contraseña incorrecta" });
    }

    res.status(200).json({ message: "Contraseña correcta" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
