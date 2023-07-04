import Role from '../models/Role.js'
import User from '../models/User.js';

export const createRoles = async ()=>{
   try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    const values = await Promise.all([
    new Role({name:"admin"}).save(),
    new Role({name:"employee"}).save(),
    new Role({name:"client"}).save()])
    console.log(values);
   } catch (error) {
        console.error(error)
   }
}
export const createAdmin = async ()=>{
   try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;

    const newUser= new User({
      fullName:"Yuri Rios",
      email:"yuriRios@gmail.com",
      password:await User.encryptPassword("admin123")
  })
   const roleAdmin= await Role.findOne({name:"admin"});
   const roleEmployee= await Role.findOne({name:"employee"});
   newUser.roles=[roleAdmin._id,roleEmployee._id];
   const savedUser=await newUser.save()
   } catch (error) {
        console.error(error)
   }
}