import express from 'express';
import bodyParser from 'body-parser';
import fileupload from 'express-fileupload';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// create a database connection  
mongoose.connect(process.env.MONGODB_URL).then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection error:', err))



const PORT = process.env.PORT || 5000;
const app = express();

const __dirname = path.resolve();


//to link router configration in app.js
import userroute from './routes/user.router.js';
import categoryroute from './routes/category.router.js'
import SubCategoryroute from './routes/Subcategory.js'
import Productrouter from './routes/Product.router.js'
import PaymentRoutes from './routes/payment.router.js'


//to extract a body from url body:(body parser is used
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//application level middlewares load cors configration
app.use(cors());

//to binary resource
app.use(fileupload())

//application level middleware
app.use("/user", userroute)
app.use("/category", categoryroute)
app.use("/subcategory", SubCategoryroute)
app.use("/product", Productrouter)

app.use("/payment", PaymentRoutes)

// ✅ Create a route to send the public key to frontend
app.get('/get-razorpay-key', (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
});


app.use(express.static(path.join(__dirname, "./ui/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./ui/build","index.html"));
});

app.listen(PORT, () => {
    console.log(`server invoked at http://localhost:${PORT}`);
})
