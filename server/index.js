import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;
import express from 'express'
const app=express();
import { configDotenv } from 'dotenv';
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

configDotenv();

const port=3333 || process.env.PORT

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();


// api end point for food
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

//api end point for auth
app.use("/api/user",userRouter)

//api end point for cart
app.use("/api/cart",cartRouter)

//endpoint for place order
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("api is running")
})
// mongodb+srv://kamal:<db_password>@tomato.vnqyf1c.mongodb.net/?

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})
