// import Detail from "../models/Detail";



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
