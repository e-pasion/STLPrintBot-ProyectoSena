// import Detail from "../models/Detail";

import Cart from "../models/Cart.js";
import Detail from "../models/Detail.js";



// userId:{ref:"User",type: Schema.Types.ObjectId},
// products:[{
//     ref:"Product",type:Schema.Types.ObjectId
// }],
// shipData:{
//     firstName:{type:string,required:true},
//     lastName:{type:string,required:true},
//     address:{type:string,required:true},
//     city:{type:string,required:true},
//     numberPhone:{type:string,required:true},
//     optionalNotes:{type:string,required:false},
// },
// totalPrice:{type:Number, required:true},
// buyDate:{type:Date, required:true}

// export const createColor = async (shipData,price) => {
//     try {
//         const detailData= {
//             userId:shipData.userId
//             firstName:shipData.firstName
//         }
//       const color = new Detail(req.body);
//       await color.save();
//       res.send(color);
//     } catch (error) {
//       console.log(error);
//       res.status(500).send(error);
//     }
//   };


export const createDetail= async(detailData,totalPrice)=>{
    let { address, city,user_id,optional_notes,last_name,first_name,number_phone }=detailData;

    const cartFound= await Cart.findOne({userId:user_id});

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
        optionalNotes:optional_notes
      },
      totalPrice
    })
    const savedDetail= await newDetail.save();
    if (savedDetail) {
        await Cart.updateOne({ _id: cartFound._id }, { $set: { products: [] } });
        await Cart.updateOne({ _id: cartFound._id }, { $set: { totalWeigth: 0 } });

    } 

   
    // await Cart.findOneAndUpdate({ userId: req.userId }, 
    //   { $push: { products: newProduct._id } },
    //   { new: true });
  
    //   await Cart.findOneAndUpdate(
    //     { userId: req.userId },
    //     { $inc: { totalWeigth: newProduct.weigth } },
    //     { new: true }
    //   );
  
    console.log("todo ok");
  }