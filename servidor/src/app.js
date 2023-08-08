import express from "express"
import dbConnect from './config/db.js'
import colorRoutes from './routes/color_routes.js';
import authRoutes from './routes/auth_routes.js';
import productRoutes from './routes/product_routes.js'
import userRoutes from './routes/user_routes.js';
import cartRoutes from './routes/cart_routes.js'
import paymentRoutes from './routes/payment_routes.js'
import codeRoutes from './routes/code_routes.js'
import priceRoutes from './routes/price_routes.js'

import { createRoles,createAdmin, createPrices } from "./utils/initialSetup.js";
import { PORT } from "./config/config.js";

import cors from "cors"


const app= express();
// createRoles();
createAdmin();
createPrices();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))

app.use('/api/uploads', express.static('src/uploads'));
app.use('/api/color', colorRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/calculator',productRoutes);
app.use('/api/user',userRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/payment',paymentRoutes)
app.use('/api/code',codeRoutes)
app.use('/api/price',priceRoutes)


app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`)
    dbConnect();
});


export default app
