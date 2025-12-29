import mongoose from "mongoose";
const uri = process.env.DATABASE_URL
let connection: any = null;
const connectDB = async () => {
  if (connection) {
    return connection;
  }
  console.log(uri);
  
  if (!uri) {
    throw new Error("DATABASE_URL not found in environment variables ❗❗❗");
  }

  try {
    connection = await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully ✅");
    return connection;
  } catch (error) {
    console.error("Connection to MongoDB failed ❌", error);
    throw error;
  }
};

export default connectDB;