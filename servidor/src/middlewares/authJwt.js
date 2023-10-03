import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";
export const SECRET_KEY = "api-ava3d";

export const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    if (!token) return res.status(401).json({ message: "No token Provided" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.cookie("token", "", {
            expires: new Date(0),
          });
          return res
            .status(401)
            .send("El token ha caducado. Inicia sesión nuevamente.");
        }
        return res.status(400).json({ message: "No valid token" });
      }
      req.userId = user.id;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json("Unauthorized");
  }
};



export const isAdmin = async (req, res, next) => {
  let validateAdmin = false;
  const user = await User.findById(req.userId);
  const rolesFound = await Role.find({ _id: { $in: user.roles } });
  console.log(rolesFound);
  rolesFound.forEach((role) => {
    if (role.name === "admin") {
      validateAdmin = true;
    }
  });
  if (validateAdmin) {
    next();
    return;
  } else {
    return res.status(401).json("Unauthoraized, need more privilegies");
  }
};
