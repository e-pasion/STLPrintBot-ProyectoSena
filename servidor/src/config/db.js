import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './variables.env' });

const MONGO_URL = process.env.DB_MONGO;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Conectada');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;