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