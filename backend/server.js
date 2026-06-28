import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import urlRoutes from "./routes/url.js";
dotenv.config();



const app = express();


app.use(cors({
    origin: "http://localhost:5173",
    methods:["GET","POST"],
}));
app.use(express.json());

app.use("/",urlRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT,()=>{
        console.log(`server is runnimg on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.error("Error connecting to MOnfoDb",err);
});