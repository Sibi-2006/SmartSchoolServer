import express, { json, urlencoded } from "express";
const app = express();
import cors from "cors";
import { getDataBase } from "./db.js";
import adminRouter from "./router/AdminRouter.js"
import teacherRouter from "./router/TeacherRouter.js"
import studentRouter from "./router/StudentRouter.js"
import attendanceRoutes from "./router/attendanceRoutes.js"
import markRouter from "./router/addMarksRouter.js";
import TimeTableRouter from "./router/TimeTableRouter.js";
import parentRouter from "./router/parentRouter.js";
import forgetPassword from "./router/forgetPassword.js"
const PORT = process.env.PORT || 3500;

app.use(json());
app.use(urlencoded({ extended : true}));

app.use(cors());

app.use("/api/adminlogin",adminRouter);
app.use("/api/create",teacherRouter);
app.use("/api/student",studentRouter);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/add-mark",markRouter);
app.use("/api/attendance",attendanceRoutes);
app.use("/api/timetable",TimeTableRouter);
app.use("/api/parent",parentRouter);
app.use("/api/forget/password",forgetPassword);
app.get("/", (req, res) => {
  res.send("Welcome to Smart School Server!");
});

const startServer = async () =>{
    try{
        await getDataBase();
        app.listen(PORT , ()=>{
            console.log("server run on ",PORT,"....");
        });
    }catch(err){
        console.error("❌ Failed to connect to database:", err.message);
    }
}

startServer();