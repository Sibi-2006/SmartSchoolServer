import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./module/Adminschema.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const newAdmin = new Admin({
      name: "Sibi",
      loginId: "sibiraj",
      password: "12345",
    });
    await newAdmin.save();
    console.log("✅ Admin created successfully");
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
