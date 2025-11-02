
const express = require('express');
const cors = require("cors");

require("./db/config");
const User = require("./db/User");
const app = express();

app.use(express.json());
app.use(cors());
//making API route
app.post("/register", async (req, resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    resp.send(result)
})


// app.listen(3000);


// Only mongoDB
// const mongoose = require("mongoose");
// const connectDB = async()=>{
//     mongoose.connect("mongodb://localhost:27017/local");
//     const productSchema = new mongoose.Schema({});
//     const product = mongoose.model('product', productSchema);
//     const data = await product.find();
//     console.warn(data);
// }
// connectDB();


//only express
app.get("/", (req, resp)=>{
    resp.send("Hi Himanshu, your app is running")
});
app.listen(3000)





// using express and mongoDB : 
// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// // Middleware
// app.use(express.json());

// MongoDB connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017");
//     console.log("✅ MongoDB Connected");

//     // Define schema & model
//     const productSchema = new mongoose.Schema({
//       name: String,
//       price: Number,
//     });
//     const Product = mongoose.model("Product", productSchema);

//     // Example route
//     app.get("/", async (req, res) => {
//       const data = await Product.find();
//       res.json(data);
//     });

//     // Start server
//     app.listen(3000, () => console.log("🚀 Server running on port 3000"));
//   } catch (error) {
//     console.error("❌ Connection failed:", error);
//   }
// };

// connectDB();