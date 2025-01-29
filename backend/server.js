import express from "express";
import usersRoute from "./routes/users.route.js";
import ordersRoute from "./routes/orders.route.js";
import productsRoute from "./routes/products.route.js";
import connectDB from "./db/db.js";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/protectRoute.js";
import { v2 as cloudinary } from 'cloudinary';

const app = express();
const PORT = process.env.PORT || 3000
dotenv.config()

app.use(express.json({limit: '5mb'}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(authMiddleware)

app.use('/api/user', usersRoute)
app.use('/api/products', productsRoute)
app.use('/api/orders', ordersRoute)

app.listen(PORT, ()=>{
    console.log(`server is running, port: ${PORT}`)
    connectDB()
})