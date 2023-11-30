import Setting from '../models/Setting.js';
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
      firstName:"Yuri",
      lastName:"Rios",
      email:"admin@gmail.com",
      password:await User.encryptPassword("Password1")
  })
   const roleAdmin= await Role.findOne({name:"admin"});
   const roleEmployee= await Role.findOne({name:"employee"});
   newUser.roles=[roleAdmin._id,roleEmployee._id];
   const savedUser=await newUser.save()
   } catch (error) {
        console.error(error)
   }
}

export const createPrices = async ()=>{

   try {
      const count = await Setting.estimatedDocumentCount();
      if(count>0) return;
      const settings=[
         {name:"Precio minimo de envio gratis",value:50000},
         {name:"Costo del envio en el area metropolitana",value:8000},
         {name:"Costo del envio en el resto del pais",value:12000},
         {name:"Costo del filamento por KG",value:80000},
         {name:"Porcentaje de error",value:10},
         {name:"Porcentaje de ganancia",value:50}
      ]
      const newPriceDocument = new Setting({ settings });
      newPriceDocument.save()
   } catch (error) {
      console.error(error)
   }
  
}