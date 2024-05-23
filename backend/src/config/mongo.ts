import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
    });
    console.log('MongoDB connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to MongoDB:', error);
  }
};
