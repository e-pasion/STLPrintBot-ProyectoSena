import mongoose from 'mongoose';
//import dotenv from 'dotenv';

//dotenv.config({ path: './variables.env' });

//const MONGO_URL = process.env.DB_MONGO;

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/AVA3D", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('>> DB Connect LOCAL...');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;