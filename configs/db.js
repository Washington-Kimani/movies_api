import mongoose from'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// get the uri from the.env file
const uri = process.env.MONGODB_URI;


//a function to connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;