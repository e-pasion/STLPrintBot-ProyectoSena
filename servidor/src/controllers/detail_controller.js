// import Detail from "../models/Detail";
// import {parse} from "date-fns"
import Cart from "../models/Cart.js";
import Code from "../models/Code.js";
import Detail from "../models/Detail.js";
import User from "../models/User.js";




export const createDetail= async(detailData,totalPrice)=>{
  try {
    let { address, city,user_id,optional_notes,last_name,first_name,number_phone,ship_date,code_name }=detailData;


    const cartFound= await Cart.findOne({userId:user_id});

    const codeFound= await Code.findOne({code:code_name});
    if(codeFound){
       await User.findByIdAndUpdate(
        user_id,
        { $push: { codesUsed: codeFound._id } }, // Agregar el codeId a la lista codesUsed
        { new: true } 
    );
    }

    const cartProducts=cartFound.products
    const newDetail= new Detail({
      userId:user_id,
      products:cartProducts,
      shipData:{
        firstName:first_name,
        lastName:last_name,
        address,
        city,
        numberPhone:number_phone,
        optionalNotes:optional_notes,
        estimatedDate:ship_date
      },
      totalPrice
    })
    const savedDetail= await newDetail.save();
    if (savedDetail) {
        await Cart.updateOne({ _id: cartFound._id }, { $set: { products: [] } });

    } 
    console.log("todo ok");
    
  } catch (error) {
    console.log(error);
  }
   
  }

  export const getAllDetails = async (req, res) => {
    try {
     const {page, limit, status} = req.query;
     const query = {
      status
     };
     
     const options = {
       page:parseInt(page,10) || 1,
       limit: parseInt(limit,10) || 10,
       populate:{
        path : 'products',
        populate : {
          path : 'color'
        }
      }
     }
     const result = await Detail.paginate(query,options);
     res.json(result);
   } catch (error) {
    console.log(error);
     res.status(400).send(error.message)
   }
 };