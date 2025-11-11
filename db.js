import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const getDataBase = async() =>{
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("Mongo URI not found in env");
    try{
        await mongoose.connect(uri);
        console.log("Database connected...");
    }catch(err){
        console.error("❌ Cannot connect to database:", err.message);
        throw err;
    }
}