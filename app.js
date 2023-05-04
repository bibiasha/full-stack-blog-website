import express from "express";
import mongoose from "mongoose";
const app= express();
import router from "./routes/user-routes"
import blogRouter from "./routes/blog-routes";
import cors from'cors';

app.use(cors());
app.use(express.json());
app.use("/api/user", router)
app.use("/api/blog", blogRouter)

//7oWgjp3brCxzbSFQ
//bibiashakadmeshwar

mongoose.connect('mongodb+srv://bibiashakadmeshwar:7oWgjp3brCxzbSFQ@cluster0.uq2opkr.mongodb.net/test').then(()=>app.listen(5000)).then(()=>console.log('Connected to databaseand listening to localhost 5000')).catch((error)=>{
    console.log(error)
})


//mongodb+srv://bibiashakadmeshwar:7oWgjp3brCxzbSFQ@cluster0.uq2opkr.mongodb.net/Blog?retryWrites=true&w=majority


